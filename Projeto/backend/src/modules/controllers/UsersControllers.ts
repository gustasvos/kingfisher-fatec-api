import express, { Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { User } from '../models/usuario'
import { Not } from 'typeorm'
import { console } from 'inspector'
import bcrypt from 'bcrypt'
import { validarCPF } from '../../utils/validarCPF'
import { validarEmail } from '../../utils/validarEmail'
import { validarSenha } from '../../utils/validarSenha'
import { validarTelefone } from '../../utils/validarTelefone'
//dotenv permite ler variáveis do .env
import * as dotenv from "dotenv"
dotenv.config()

const router = express.Router()
/*
    Json do Front-end
    {
        "nome":     "string",
        "cpf":      "string",
        "email":    "string",
        "telefone": "string",
        "cargo":    "string",
        "senha":    "string",
        "data_de_contratacao": "2024-06-12",
    }
 */
router.post('/usuario/create',async (req: Request, res: Response) => {
    try{
        var data = req.body

        if(!validarCPF(data.cpf)){
            res.status(400).json({
                mesage:'CPF inválido!'
            })
            return
        }

        if(!validarEmail(data.email)){
            res.status(400).json({
                mesage:'Email inválido!'
            })
            return
        }

        if(!validarTelefone(data.telefone)){
            res.status(400).json({
                mesage:'Telefone inválido!'
            })
            return
        }

        if (!validarSenha(data.senha)) {
            res.status(400).json({
                message: 'Senha inválida! A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'
            })
            return
        }

        const userRepository = AppDataSource.getRepository(User)

        const existingUser = await userRepository.findOne({
            //condição OR no TypeORM
            where: [
                {cpf: data.cpf},
                {email: data.email}
            ]            
        })
        if(existingUser){
            res.status(400).json({
                message:'Já existe usuário cadastrado com esse email!'
            })
        return
        }
        const saltRounds = Number(process.env.SALT_ROUNDS)

        const senha = data.senha
        const hash = await bcrypt.hash(senha, saltRounds)
        data.senha = hash //inserindo a hash

        const newUser = userRepository.create(data) 
        await userRepository.save(newUser)
        console.log(newUser)

        res.status(201).json({
            message:'Usuário cadastrado com sucesso!',
            user: newUser
        })
        
    }catch(error){ res.status(500).json({
        message:'Erro ao cadastrar o usuário!',
        error: error
    })}
})
// Comparar senha fornecida com hash armazenado
// const senhaValida = await bcrypt.compare('minhaSenhaSegura', hash);

export default router