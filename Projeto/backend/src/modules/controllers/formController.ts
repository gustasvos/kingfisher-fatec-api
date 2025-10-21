import { Request, Response } from 'express';
import path from 'path';
import { writeDataRow, readCsv, GenericDataRow } from '../../services/csvService';
import { listUploadImages } from '../../services/fileService';
import { csvPath as defaultCsvPath, dataDir, uploadsDir } from '../../config/paths'; 
import { validateFormData } from '../../services/validationService'
import { allFormSchemas } from '../../config/formSchemas'; 
import fs from 'fs/promises';


// Helper para gerar o caminho do CSV dinamicamente
const getFormCsvPath = (formTitle: string) => {
  const safeTitle = formTitle.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
  return path.join(dataDir, `${safeTitle}.csv`);
};

// Função para deletar todos os arquivos e a pasta do usuário
async function deleteUserUploadFolder(files: Express.Multer.File[] | undefined) {
  // Verifica se files existe e tem conteúdo
  if (!files || files.length === 0) return;

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
    // 💡 Correção 1: 'req.files' pode ser 'Express.Multer.File[]' ou 'undefined' (se for json/urlencoded)
    const files = (req.files || []) as Express.Multer.File[];
    
    // 1. Identificar o formulário através do campo 'formTitle'
    const formTitle = data.formTitle as string; 
    
    if (!formTitle) {
        await deleteUserUploadFolder(files);
        return res.status(400).json({ message: 'Identificador do formulário (formTitle) é obrigatório.' });
    }

    const schema = allFormSchemas[formTitle];
    if (!schema) {
        await deleteUserUploadFolder(files);
        return res.status(404).json({ message: `Esquema de formulário para "${formTitle}" não encontrado.` });
    }

    // 2. Definir o caminho do CSV dinamicamente
    const currentCsvPath = getFormCsvPath(formTitle);

    // 3. Validação dos dados (apenas campos que não são 'upload')
    const fieldsToValidate = Object.fromEntries(
        Object.entries(data).filter(([key]) => {
            const field = schema.find(f => f.name === key);
            // Filtra o esquema para validar apenas campos que não são do tipo 'upload'
            // O campo 'formTitle' também é excluído da validação de dados, pois não está no payload
            return field && field.type !== 'upload' && field.name !== 'formTitle'; 
        })
    );
    const validationSchema = schema.filter(f => f.type !== 'upload' && f.name !== 'formTitle');

    const validationError = await validateFormData(fieldsToValidate, validationSchema, currentCsvPath);
    if (validationError) {
      await deleteUserUploadFolder(files);
      return res.status(400).json({ message: validationError });
    }

    // 4. Processamento dos arquivos
    const rowToSave: Record<string, any> = { ...data };
    delete rowToSave.formTitle; 
    
    // 💡 Correção 2: Verifica se 'files.length > 0'. Se for JSON, 'files' é [] e esta seção é ignorada.
    if (files.length > 0) { 
      const filesMap = files.reduce((acc: Record<string, string[]>, file) => {
          const fieldName = file.fieldname;
          const relativePath = path.relative(path.join(__dirname, '..', '..'), file.path).replace(/\\/g, '/');
          
          if (!acc[fieldName]) acc[fieldName] = [];
          acc[fieldName].push(relativePath);
          return acc;
      }, {});

      schema.filter(f => f.type === 'upload').forEach(field => {
          const filePaths = filesMap[field.name] || [];
          if (filePaths.length > 0) {
              rowToSave[field.name] = filePaths.length === 1 ? filePaths[0] : JSON.stringify(filePaths);
          } else if (field.required) {
             return res.status(400).json({ message: `Campo de upload obrigatório "${field.name}" não preenchido.` });
          }
      });
    }
    
    // 5. Salvar dados
    // Remove o 'formTitle' do schema que é usado para gerar o cabeçalho do CSV
    await writeDataRow(rowToSave, schema.filter(f => f.name !== 'formTitle'), currentCsvPath);

    res.status(201).json({ message: 'Dados salvos com sucesso!', data: rowToSave, csvPath: currentCsvPath });

  } catch (error) {
    console.error('Erro no handleFormSubmit:', error); // Log para depuração
    // Acessa o message da exceção se for um Error, caso contrário usa uma mensagem genérica
    res.status(500).json({ message: error instanceof Error ? error.message : 'Erro inesperado.' }); 
  }
};

export const listarUploadsBack = async (req: Request, res: Response) => {
  try {
    const pastas = await fs.readdir(uploadsDir);

    let html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head><meta charset="UTF-8"><title>Galeria de Uploads</title></head>
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

/**
 * Retorna o conteúdo de um CSV em formato JSON.
 * Se nenhum formTitle for fornecido, lista os nomes dos formulários disponíveis.
 */
export const listarCSV = async (req: Request, res: Response) => {
  try {
    const formTitle = req.query.formTitle as string;

    if (!formTitle) {
      const availableForms = Object.keys(allFormSchemas);
      return res.status(200).json({ 
        message: 'Por favor, forneça o nome do formulário (formTitle) como parâmetro de consulta para ver o CSV.',
        formsDisponiveis: availableForms
      });
    }

    const schema = allFormSchemas[formTitle];
    if (!schema) {
      return res.status(404).json({ message: `Esquema de formulário para "${formTitle}" não encontrado.` });
    }

    const targetCsvPath = getFormCsvPath(formTitle);
    
    let data: GenericDataRow[] = [];
    try {
        data = await readCsv(targetCsvPath);
    } catch (e) {
        // Se o arquivo CSV não existir, retorna array vazio e info.
        return res.status(200).json({
            message: `O arquivo CSV para "${formTitle}" ainda não existe. Envie o formulário para criá-lo.`,
            dados: []
        });
    }

    res.setHeader('Content-Type', 'application/json'); 
    res.json(data);
  } catch (error) {
    console.error('Erro ao listar CSV:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Erro desconhecido' });
  }
};
