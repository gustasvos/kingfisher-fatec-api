import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { uploadsDir } from '../config/paths'

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imgFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Apenas imagens são permitidas!"));
  }
};

// Normaliza o nome da pasta, removendo espaços e caracteres especiais
function normalizeFolderName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_-]/g, '');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userName = req.body.name || 'sem_nome';
    const safeName = normalizeFolderName(userName);

    const timestamp = (req as any).uploadTimestamp || Date.now(); // timestamp fixo
    const folderName = `${safeName}_${timestamp}`;
    const uploadPath = path.join(__dirname, '..', '..', 'uploads', folderName);

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // .jpg, .png etc
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, '_').toLowerCase();

    // Exemplo: "pneu_dianteiro_esquerdo.jpg"
    cb(null, `${baseName}${ext}`);
  }
});

export const upload = multer({ storage, fileFilter: imgFilter });