import express, { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { Cliente } from '../models/cliente'
import { RegistroCliente } from '../models/registroCliente'
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
// Rota: GET /cliente/comercial/:id_usuario
export const listClientesComUltimoStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = req.user

        const clienteRepository = AppDataSource.getRepository(Cliente)
        const registroRepository = AppDataSource.getRepository(RegistroCliente)

        let clientes: Cliente[] = []

        clientes = await clienteRepository.find({ where: { colaborador_id: parseInt(id!) } })


        if (clientes.length === 0) {
            return res.status(200).json([])
        }

        const clienteIds = clientes.map((c) => c.id)

        // Buscar todos os registros dos clientes
        const registros = await registroRepository
            .createQueryBuilder("registro")
            .leftJoinAndSelect("registro.categoria", "categoria")
            .leftJoinAndSelect("registro.cliente", "cliente")
            .where("registro.cliente_id IN (:...clienteIds)", { clienteIds })
            .orderBy("registro.data_registro", "DESC")
            .getMany()

        // Mapear último status por cliente
        const ultimoStatusMap = new Map<number, string>()
        registros.forEach(r => {
            if (r.cliente && r.categoria && !ultimoStatusMap.has(r.cliente.id)) {
                ultimoStatusMap.set(r.cliente.id, r.categoria.categoria)
            }
        })

        // Montar resposta final
        const resposta = clientes.map(c => ({
            id: c.id,
            CNPJ: c.CNPJ,
            NomeFantasia: c.NomeFantasia,
            PrazoFaturamento: c.PrazoFaturamento,
            ContatoResponsavel: c.ContatoResponsavel,
            EmailResponsavel: c.EmailResponsavel,
            CNAE: c.CNAE,
            descricao_CNAE: c.descricaoCNAE,
            colaborador_id: c.colaborador_id,
            ultimaCategoria: ultimoStatusMap.get(c.id) || null
        }))

        return res.status(200).json(resposta)
    } catch (error) {
        console.error("Erro ao listar clientes com último status:", error)
        return res.status(500).json({ message: "Erro ao listar clientes com último status" })
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