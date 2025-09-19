import { Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { Motorista } from '../models/motorista'
import bcrypt from 'bcrypt'

const motoristaRepository = AppDataSource.getRepository(Motorista)

export const createMotorista = async (req: Request, res: Response) => {
    try {
        const data = req.body

        // Verifica se já existe motorista com CPF, CNH ou email
        const existing = await motoristaRepository.findOne({
            where: [{ cpf: data.cpf }, { cnh: data.cnh }, { email: data.email }]
        })
        if (existing) {
            return res.status(400).json({ message: 'Já existe motorista com esses dados!' })
        }

        // Criptografar senha
        const saltRounds = 10
        data.senha = await bcrypt.hash(data.senha, saltRounds)

        const novoMotorista = motoristaRepository.create(data)
        await motoristaRepository.save(novoMotorista)

        res.status(201).json({
            message: 'Motorista cadastrado com sucesso!',
            motorista: novoMotorista
        })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar motorista', error })
    }
}

export const getMotoristas = async (req: Request, res: Response) => {
    try {
        const motoristas = await motoristaRepository.find()
        res.json(motoristas)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar motoristas', error })
    }
}

export const getMotoristaById = async (req: Request, res: Response) => {
    try {
        const motorista = await motoristaRepository.findOneBy({ id: parseInt(req.body.id) })
        if (!motorista) return res.status(404).json({ message: 'Motorista não encontrado' })
        res.json(motorista)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar motorista', error })
    }
}

export const updateMotorista = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.body.id)
        let motorista = await motoristaRepository.findOneBy({ id })

        if (!motorista) return res.status(404).json({ message: 'Motorista não encontrado' })

        // Atualizar senha se vier no body
        if (req.body.senha) {
            req.body.senha = await bcrypt.hash(req.body.senha, 10)
        }

        motoristaRepository.merge(motorista, req.body)
        await motoristaRepository.save(motorista)

        res.json({ message: 'Motorista atualizado com sucesso!', motorista })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar motorista', error })
    }
}

export const deleteMotorista = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.body.id)
        const result = await motoristaRepository.delete(id)
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Motorista não encontrado' })
        }
        res.json({ message: 'Motorista deletado com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar motorista', error })
    }
}