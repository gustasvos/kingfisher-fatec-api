import { NextFunction, Request, Response } from 'express'
import { User } from '../modules/models/usuario';
import { AppDataSource } from '../config/database';
const jwt = require('jsonwebtoken');


class AuthMiddleware {

    public autorizarUsuarioByToken = async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]
        
        const decoded = jwt.decode(token)
        // console.log(decoded)

        if (!token){
            return res.status(401).send({ message: 'Acesso restrito.' })
        }

        
        const userRepository = AppDataSource.getRepository(User)

        const existingUser = await userRepository.findOne({
            // condição AND no TypeORM
            where: {
                cpf: decoded.cpf,
                id: decoded.id
            }
        })
        if (!existingUser) {
            return res.status(401).send({ message: 'Usuário não existe.' })
        }

        req.body.user = existingUser
        // console.log(existingUser)

        return next()
    }
}

export default new AuthMiddleware(); 