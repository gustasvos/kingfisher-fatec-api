import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { User } from '../models/usuario'
import { Not } from 'typeorm'
import { console } from 'inspector'
import bcrypt from 'bcrypt'
import { validarCPF } from '../../utils/validarCPF'
import { validarEmail } from '../../utils/validarEmail'
import { validarSenha } from '../../utils/validarSenha'
import { validarTelefone } from '../../utils/validarTelefone'
import { TipoAcesso } from "./../../utils/enums/usuarioEnums";
//dotenv permite ler variáveis do .env
import * as dotenv from "dotenv"
dotenv.config()
import jwt from 'jsonwebtoken'
import { UsuarioLocal } from '../models/UsuarioLocal'
import { LocalTrabalho } from '../../utils/enums/usuarioLocalEnums'
// Simulando uma blacklist em memória
export const tokenBlacklist: string[] = [];

export const checkIfUsersExist = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const adminCount = await userRepository.count({ where: { role: TipoAcesso.admin  } });
  res.json({ exists: adminCount > 0 });

    // Se adminCount for 0, não tem usuários administradores ainda
    const exists = adminCount > 0;

    res.status(200).json({ exists });
  } catch (error) {
    res.status(500).json({ message: "Erro ao verificar usuários" });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
    try{
        let data = req.body

        if(!validarCPF(data.cpf)){
            res.status(400).json({
                mesage:'CPF inválido!'
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
                {cpf: data.cpf}
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
        res.status(200).json(user)
        return
    }catch(error){
        res.status(500).json({message:'Erro ao listar o usuário!'})
    }
}
export const updateUsuario = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!validarCPF(data.cpf)) {
            return res.status(400).json({ message: 'CPF inválido!' });
        }

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: parseInt(id!) });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        // Removendo caracteres não numéricos do CPF
        data.cpf = data.cpf.replace(/\D/g, '');

        const existingUser = await userRepository.findOne({
            where: {
                id: Not(parseInt(id!)),
                cpf: data.cpf
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Já existe usuário cadastrado com esse CPF!' });
        }

        // Só validar e gerar hash se a senha foi enviada
        if (data.senha) {
            if (!validarSenha(data.senha)) {
                return res.status(400).json({
                    message: 'Senha inválida! A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'
                });
            }

            const saltRounds = Number(process.env.SALT_ROUNDS);
            data.senha = await bcrypt.hash(data.senha, saltRounds);
        } else {
            // Se não enviar senha, mantemos a senha atual do banco
            delete data.senha;
        }

        userRepository.merge(user, data);
        const results = await userRepository.save(user);

        return res.status(200).json({
            message: 'Usuário atualizado com sucesso!',
            user: results
        });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar o usuário!", error });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    try{
        const {id} = req.params
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id: parseInt(id!)})

        if(!user){
            res.status(404).json({message:'Usuário não encontrado!'})
            return
        }

        await userRepository.remove(user)

        res.status(200).json({message:'Usuário deletado com sucesso!'})
        return

    }catch(error){
        res.status(500).json({ message:"Erro ao deletar o usuário!" }) 
    }
}

// ENDPOINT LOGIN
export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { cpf, senha } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({
            where: { cpf: cpf }
        });

        if (!user) {
            return res.status(401).json({
                message: 'CPF ou senha inválidos.'
            });
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({
                message: 'CPF ou senha inválidos.'
            });
        }

        const jwt = require('jsonwebtoken');

        // GERAR O TOKEN 
        const token = jwt.sign(
            { id: user.id, nome: user.nome, cpf: user.cpf, role: user.role, cargo: user.cargo, }, // payload
            process.env.JWT_SECRET as string,   // chave secreta
            { expiresIn: process.env.JWT_EXPIRES_IN} // expiração
        );

        // Resposta do login
        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            user: {
                id: user.id,
                nome: user.nome,
                cpf: user.cpf,
                role: user.role,
                cargo: user.cargo,
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({
            message: 'Erro interno ao tentar realizar o login.',
            error: error
        });
    }
}


export const logoutUsuario = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(400).json({ message: 'Token não fornecido.' });
    }

    if (tokenBlacklist.includes(token)) {
        return res.status(200).json({
        message: 'Token já está inválido (logout já efetuado anteriormente).',
        tokenDescartado: token
        });
    }
    tokenBlacklist.push(token!);
    console.log(`Token adicionado à blacklist: ${token}`);

    return res.status(200).json({
        message: 'Logout efetuado com sucesso. Token foi invalidado.',
        tokenDescartado: token
    });
}


