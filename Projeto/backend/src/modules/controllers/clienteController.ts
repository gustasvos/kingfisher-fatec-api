import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { Cliente } from '../models/cliente'
import { Not } from 'typeorm'
import { validarCNPJ } from "../../utils/validarCNPJ"
import { validarEmail } from '../../utils/validarEmail'
import { CategoriaFunil } from '../../utils/enums/categoriaFunil'
import { isEnum, IsEnum } from 'class-validator'

export const createCliente = async (req: Request, res: Response) => {
    try {
        const data = req.body

        // 1. Validações
        if (!validarCNPJ(data.CNPJ)) {
            return res.status(400).json({
                message: 'CNPJ inválido!'
            })
        }

        if (data.EmailResponsavel && !validarEmail(data.EmailResponsavel)) {
            return res.status(400).json({
                message: 'Email do responsável inválido!'
            })
        }

        const clienteRepository = AppDataSource.getRepository(Cliente)

        // 2. Limpa o CNPJ (removendo formatação)
        const cnpjLimpo = data.CNPJ.replace(/\D/g, '')

        // 3. Verifica duplicidade
        const existingCliente = await clienteRepository.findOne({
            where: { CNPJ: cnpjLimpo }
        })

        if (existingCliente) {
            return res.status(400).json({
                message: 'Já existe um cliente cadastrado com este CNPJ!'
            })
        }

        // 4. Salva o novo cliente
        data.CNPJ = cnpjLimpo // Garante que o CNPJ salvo está sem formatação
        data.CategoriaFunil = CategoriaFunil.PROSPECT

        const newCliente = clienteRepository.create(data)
        await clienteRepository.save(newCliente)

        res.status(201).json({
            message: 'Cliente cadastrado com sucesso!',
            cliente: newCliente
        })

    } catch (error) {
        res.status(500).json({
            message: 'Erro ao cadastrar o cliente!',
            error: error
        })
    }
}

export const listCliente = async (req: Request, res: Response) => {
    try {
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const clientes = await clienteRepository.find()

        res.status(200).json(clientes)
        return

    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar os clientes!' })
    }
}

export const listClienteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const cliente = await clienteRepository.findOneBy({ id: parseInt(id!) })

        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente não encontrado!'
            })
        }

        res.status(200).json(cliente)
        return

    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar o cliente!' })
    }
}

export const updateCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = req.body
        const clienteRepository = AppDataSource.getRepository(Cliente)

        // 1. Encontra o cliente
        const cliente = await clienteRepository.findOneBy({ id: parseInt(id!) })
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        // 2. Validações (se os campos foram enviados)
        if (data.CNPJ) {
            if (!validarCNPJ(data.CNPJ)) {
                return res.status(400).json({ message: 'CNPJ inválido!' })
            }
            data.CNPJ = data.CNPJ.replace(/\D/g, '')

            // 3. Verifica duplicidade do CNPJ (excluindo o ID atual)
            const existingCliente = await clienteRepository.findOne({
                where: {
                    id: Not(parseInt(id!)),
                    CNPJ: data.CNPJ
                }
            })
            if (existingCliente) {
                return res.status(400).json({ message: 'Já existe outro cliente cadastrado com esse CNPJ!' })
            }
        }

        if (data.EmailResponsavel && !validarEmail(data.EmailResponsavel)) {
            return res.status(400).json({ message: 'Email do responsável inválido!' })
        }

        clienteRepository.merge(cliente, data)
        const results = await clienteRepository.save(cliente)

        return res.status(200).json({
            message: 'Cliente atualizado com sucesso!',
            cliente: results
        })

    } catch (error) {
        return res.status(500).json({ message: "Erro ao editar o cliente!", error })
    }
};

export const deleteCliente = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const clienteRepository = AppDataSource.getRepository(Cliente)
        const cliente = await clienteRepository.findOneBy({ id: parseInt(id!) })

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' })
        }

        await clienteRepository.remove(cliente)

        res.status(200).json({ message: 'Cliente deletado com sucesso!' })
        return

    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o cliente!" })
    }
}

export const updateClienteCategoria = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { categoria } = req.body

        if (!categoria) {
            return res.status(400).json({ message: 'Nova categoria é obrigatória' })
        }
        
        if (!isEnum(categoria, CategoriaFunil)) {
            return res.status(400).json({ message: `Categoria inválida: ${categoria}` });
        }

        const clienteRepository = AppDataSource.getRepository(Cliente);
        const cliente = await clienteRepository.findOneBy({ id: parseInt(id!) });

        if (!cliente) {
            return res.status(404).json({ message: 'Cliente não encontrado!' });
        }

        // cliente.Categoria = categoria;
        await clienteRepository.save(cliente);

        return res.status(200).json({
            message: `Cliente movido para ${categoria} com sucesso!`,
            cliente: cliente
        });

    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar categoria do cliente!", error });
    }
};