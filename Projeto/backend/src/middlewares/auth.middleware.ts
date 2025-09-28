import { NextFunction, Request, Response } from 'express'
import { User } from '../modules/models/usuario';
import { AppDataSource } from '../config/database';
import { tokenBlacklist } from '../modules/controllers/UsersControllers';
const jwt = require('jsonwebtoken');


class AuthMiddleware {

    public autorizarUsuarioByToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).send({ message: 'Acesso restrito.' })
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'Erro interno: chave JWT ausente.' });
        }
        if (tokenBlacklist.includes(token)) {
            return res.status(401).json({ message: 'Token inválido. Faça login novamente.' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as any
            const userRepository = AppDataSource.getRepository(User)

            decoded.id = Number(decoded.id)
            decoded.cpf = decoded.cpf?.replace(/\D/g, '');
            console.log('Token decodificado:', decoded);

            const existingUser = await userRepository.findOne({
                // condição AND no TypeORM
                where: {
                    id: decoded.id,
                    cpf: decoded.cpf,
                }
            })
            if (!existingUser) {
                return res.status(401).send({ message: 'Usuário não existe.' })
            }
            

            req.user = existingUser

            return next()
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado. Faça login novamente.' });
            }
            return res.status(401).json({ message: 'Token inválido. Faça login novamente.' });
        }
    }
}

export const autenticarUsuario = new AuthMiddleware().autorizarUsuarioByToken; 