import fs from 'fs/promises';
import { uploadsDir } from '../config/paths';

const imageRegex = /\.(jpe?g|png|gif|webp|bmp)$/i;

export async function listUploadImages(): Promise<string[]> {
  try {
    const files = await fs.readdir(uploadsDir);
    return files.filter(file => imageRegex.test(file));
  } catch {
    throw new Error('Erro ao ler a pasta de uploads.');
  }
}
