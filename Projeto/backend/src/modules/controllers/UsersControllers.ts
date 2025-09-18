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

export const createUsuario = async (req: Request, res: Response) => {
    try{
        let data = req.body

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
                message:'Já existe usuário cadastrado com esse cpf ou email!'
            })
        return
        }
        const saltRounds = Number(process.env.SALT_ROUNDS)

        const senha = data.senha
        const hash = await bcrypt.hash(senha, saltRounds)
        data.senha = hash //inserindo a hash
        data.cpf = data.cpf.replace(/\D/g, '')//removendo caracteres não numéricos

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
}
export const listUsuario = async (req: Request, res: Response) => {
    try{
        /*
        // Admin pode ver qualquer usuário
        if (req.user?.role !== 'admin' && req.user?.role !== 'operacional') {
            res.status(403).json({
                message: 'Você não tem permissão para listar todos os usuários.'
            })
            return
        }
        */
        const userRepository = AppDataSource.getRepository(User)
        const users = await userRepository.find()

        res.status(200).json(users)
        return
    }catch(error){
        res.status(500).json({message:'Erro ao listar os usuários!'})
    }
}
export const listUsuarioById = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: parseInt(id!)})

        if(!user){
            res.status(404).json({
                message:'Usuário não encontrado!'
            })
            return
        }
        /*
        // Somente o próprio usuário ou admin pode ver
        if (req.user?.id !== user.id && req.user?.role !== 'admin') {
            res.status(403).json({
                message: 'Você não tem permissão para ver os dados deste usuário.'
            })
            return
        }
        */
        res.status(200).json(user)
        return
    }catch(error){
        res.status(500).json({message:'Erro ao listar o usuário!'})
    }
}
export const updateUsuario = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const data = req.body
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: parseInt(id!)})
        if(!user){
            res.status(404).json({message:'Usuário não encontrado!'})
            return
        }
        /*
        // Somente admin ou o próprio usuário pode editar
        if (req.user?.id !== user.id && req.user?.role !== 'admin' && req.user?.role !== 'comercial') {
            res.status(403).json({
                message: 'Você não tem permissão para editar este usuário.'
            })
            return
        }
        */
        const existingUser = await userRepository.findOne({
            where: {
                id: Not(parseInt(id!)),
                email: data.email,
                cpf: data.cpf
            }
        })
        if(existingUser){
            res.status(400).json({
                message:'Já existe usuário cadastrado com esse email ou cpf!'
            })
        return
        }
        userRepository.merge(user, data)
        const results = await userRepository.save(user)
        res.status(200).json({
            message:'Usuário atualizado com sucesso!',
            user: results
        })
        return
    }catch(error){ 
        res.status(500).json({ message:"Erro ao editar o usuário!" }) 
    }
}
export const deleteUsuario = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: parseInt(id!)})

        if(!user){
            res.status(404).json({message:'Usuário não encontrado!'})
            return
        }
        /*
        if (req.user?.role !== 'admin') {
            res.status(403).json({ 
            message: 'Somente administradores podem deletar usuários.' })
            return 
        }
        */
        await userRepository.remove(user)

        res.status(200).json({message:'Usuário deletado com sucesso!'})
        return

    }catch(error){
        res.status(500).json({ message:"Erro ao deletar o usuário!" }) 
    }
}
/*
✅ 1. Autenticação (Verificar se o usuário está logado)
✅ 2. Autorização (Verificar o nível de acesso do usuário)
src/
├── middlewares/
│   ├── authMiddleware.ts         ← já criado
│   ├── autorizarUsuario          ← CRIAR AQUI

// src/middlewares/authorize.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso não autorizado para esta ação." });
    }
    next();
  }
}

login:
6. Dependências necessárias
Instale as dependências se ainda não tiver:
npm install jsonwebtoken bcrypt dotenv
npm install --save-dev @types/jsonwebtoken @types/bcrypt

export const login = async (req: Request, res: Response) => {
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
*/