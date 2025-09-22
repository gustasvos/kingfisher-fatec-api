import { NextFunction, Request, Response } from 'express'

class AuthMiddleware {

    public autorizarUsuarioByToken(req: Request, res: Response, next: NextFunction){
        const token = req.body.token || req.headers['x-acess-token']

        if (!token){
            return res.status(401).send({ message: 'Acesso restrito!' })
        }

        return next()
    }
}

export default new AuthMiddleware();