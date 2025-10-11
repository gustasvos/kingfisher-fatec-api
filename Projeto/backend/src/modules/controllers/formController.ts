import { Request, Response } from 'express';
import path from 'path';
import { writeDataRow, readCsv } from '../../services/csvService';
import { listUploadImages } from '../../services/fileService';
import { csvPath } from '../../config/paths';
import { validateFormData } from '../../services/validationService'
import { cadastroPessoaSchema } from '../../config/formSchemas';
import fs from 'fs/promises';
import { uploadsDir } from '../../config/paths'

// Função para deletar todos os arquivos e a pasta do usuário
async function deleteUserUploadFolder(files: Express.Multer.File[]) {
  if (!files?.length) return;

  const folderPath = path.dirname(files[0]!.path);
  try {
    for (const file of files) {
      await fs.unlink(file.path).catch(() => {});
    }

    await fs.rmdir(folderPath).catch(() => {});
  } catch (err) {
    console.warn('Erro ao apagar pasta de uploads do usuário:', err);
  }
}

export const handleFormSubmit = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const files = req.files as Express.Multer.File[];

    // Validação dos dados (excluindo arquivos)
    const validationError = await validateFormData(data, cadastroPessoaSchema, csvPath);
    if (validationError) {
      await deleteUserUploadFolder(files);
      return res.status(400).json({ message: validationError });
    }

    const userFolder = files.length > 0 ? path.dirname(files[0]!.path) : '';

    const imagePaths = files.map(file => {
      return path.relative(path.join(__dirname, '..', '..'), file.path).replace(/\\/g, '/');
    });

    // Junta dados do formulário + paths das imagens
    const rowToSave = { ...data, imagePaths: JSON.stringify(imagePaths) };

    await writeDataRow(rowToSave, cadastroPessoaSchema, csvPath);

    res.status(201).json({ message: 'Dados salvos com sucesso!', data: rowToSave });

  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Erro inesperado.' });
  }
};


export const listarUploadsFront = async (req: Request, res: Response) => {
  try {
    const imagens = await listUploadImages();
    const fileUrls = imagens.map(filename => `/uploads/${filename}`);
    res.json(fileUrls);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const listarUploadsBack = async (req: Request, res: Response) => {
  try {
    const pastas = await fs.readdir(uploadsDir);

    let html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head><meta charset="UTF-8"><title>Galeria</title></head>
      <body style="font-family:sans-serif;padding:20px;">
        <h1>Galeria de Imagens por Envio</h1>
    `;

    for (const pasta of pastas) {
      const pastaPath = path.join(uploadsDir, pasta);
      const stat = await fs.stat(pastaPath);

      if (stat.isDirectory()) {
        const arquivos = await fs.readdir(pastaPath);
        const imagens = arquivos.filter(arquivo => /\.(jpg|jpeg|png|gif)$/i.test(arquivo));

        if (imagens.length > 0) {
          html += `
            <section style="margin-bottom:40px;">
              <h2>${pasta}</h2>
              <div style="display:flex;flex-wrap:wrap;gap:15px;">
          `;

          imagens.forEach(img => {
            const relativePath = `/uploads/${pasta}/${img}`;
            html += `<img src="${relativePath}" alt="${img}" style="max-width:200px;margin:10px;border:1px solid #ccc;border-radius:8px;">`;
          });

          html += `</div></section>`;
        }
      }
    }

    html += `</body></html>`;
    res.send(html);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};


export const listarCSV = async (req: Request, res: Response) => {
  try {
    const data = await readCsv(csvPath);
    res.setHeader('Content-Type', 'text/plain');
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};
