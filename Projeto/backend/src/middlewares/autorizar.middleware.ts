import { NextFunction, Request, Response } from "express"
import { User } from "../modules/models/usuario";
import { AppDataSource } from "../config/database";
import { TipoAcesso } from "../utils/enums/usuarioEnums";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const autorizarUsuario = (rolesPermitidos: string[]) => {
    return  async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const data = req.body
        const user = req.user

        if (!user) {
            res.status(401).json({ message: 'Usuário não autenticado.' });
            return
        }
        const isSelf = user.id === parseInt(id!)

        if (rolesPermitidos.includes(user.role)) {

            if (user.role !== TipoAcesso.usuario) {
                return next()
            }

            else if (isSelf) {
                if (data.role !== user.role && data.role !== undefined) {
                    res.status(405).json({ message: 'Acesso negado. Você não pode alterar seu próprio nível de acesso.'})
                    return
                }
                return next()
            }
        }

        res.status(403).json({ message: 'Acesso negado. Você não tem permissão para acessar este recurso.'})
        return
    }
}