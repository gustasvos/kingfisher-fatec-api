import { Request, Response, NextFunction } from 'express';

export function setUploadTimestamp(req: Request, res: Response, next: NextFunction) {
  // Define um timestamp fixo para esta requisição
  (req as any).uploadTimestamp = Date.now();
  next();
}
