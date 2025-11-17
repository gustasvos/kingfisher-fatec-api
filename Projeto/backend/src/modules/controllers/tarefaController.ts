import { Request, Response } from 'express';
import { AppDataSource } from '../../config/database'
import { Tarefa, StatusTarefa, TipoTarefa } from '../models/Tarefa';
import { Cliente } from '../models/cliente';
import { User } from '../models/usuario';
 
export class TarefaController {
   
    async create(req: Request, res: Response) {
        try {
            const { cliente_id, vendedor_id, titulo, data, status, tipo, descricao } = req.body;
 
            if (!titulo || !tipo || !cliente_id || !vendedor_id) {
                return res.status(400).json({
                    message: 'Campos obrigatórios ausentes: titulo, tipo, cliente_id, vendedor_id'
                });
            }
 
            const tarefaRepository = AppDataSource.getRepository(Tarefa);
            const clienteRepository = AppDataSource.getRepository(Cliente);
            const userRepository = AppDataSource.getRepository(User);
 
            const vendedor = await userRepository.findOne({ where: { id: vendedor_id } });
            if (!vendedor) {
                return res.status(404).json({ message: 'Vendedor não encontrado' });
            }
 
            const cliente = await clienteRepository.findOne({ where: { id: cliente_id } });
            if (!cliente) {
                return res.status(404).json({ message: 'Cliente não encontrado' });
            }
 
            const novaTarefa = tarefaRepository.create({
                titulo,
                data: data ? new Date(data) : new Date(),
                status: status || StatusTarefa.PENDENTE,
                tipo,
                descricao: descricao || null,
                cliente,
                vendedor
            });
 
            const resultado = await tarefaRepository.save(novaTarefa);
            return res.status(201).json(resultado);
 
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            return res.status(500).json({ message: 'Erro interno ao criar tarefa' });
        }
    }
 
    async getPendentesVendedor(req: Request, res: Response) {
        try {
            const { vendedor_id } = req.query;
           
            if (!vendedor_id) {
                return res.status(400).json({ message: 'vendedor_id é obrigatório' });
            }
 
            const tarefaRepository = AppDataSource.getRepository(Tarefa);
            const tarefas = await tarefaRepository.find({
                where: {
                    vendedor: { id: Number(vendedor_id) },
                    status: StatusTarefa.PENDENTE
                },
                relations: ['cliente', 'vendedor'],
                order: { data: 'ASC' }
            });
 
            return res.status(200).json(tarefas);
 
        } catch (error) {
            console.error('Erro ao buscar tarefas pendentes:', error);
            return res.status(500).json({ message: 'Erro interno ao buscar tarefas pendentes' });
        }
    }
 
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
           
            if (!id) {
                return res.status(400).json({ message: 'ID é obrigatório' });
            }
 
            const tarefaId = Number(id);
            const tarefaRepository = AppDataSource.getRepository(Tarefa);
            const tarefa = await tarefaRepository.findOne({
                where: { id: tarefaId },
                relations: ['cliente', 'vendedor'],
            });
 
            if (!tarefa) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
 
            return res.status(200).json(tarefa);
        } catch (error) {
            console.error('Erro ao buscar tarefa por ID:', error);
            return res.status(500).json({ message: 'Erro interno' });
        }
    }
 
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { titulo, data, status, tipo, descricao, cliente_id } = req.body;
           
            if (!id) {
                return res.status(400).json({ message: 'ID é obrigatório' });
            }
 
            const tarefaId = Number(id);
            const tarefaRepository = AppDataSource.getRepository(Tarefa);
            const clienteRepository = AppDataSource.getRepository(Cliente);
           
            const tarefa = await tarefaRepository.findOne({
                where: { id: tarefaId },
                relations: ['cliente', 'vendedor']
            });
           
            if (!tarefa) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
 
            if (titulo !== undefined) tarefa.titulo = titulo;
            if (data !== undefined) tarefa.data = new Date(data);
            if (status !== undefined) tarefa.status = status;
            if (tipo !== undefined) tarefa.tipo = tipo;
            if (descricao !== undefined) tarefa.descricao = descricao;
 
            if (cliente_id !== undefined) {
                const cliente = await clienteRepository.findOne({ where: { id: cliente_id } });
                if (!cliente) {
                    return res.status(404).json({ message: 'Cliente não encontrado' });
                }
                tarefa.cliente = cliente;
            }
 
            const resultado = await tarefaRepository.save(tarefa);
            return res.status(200).json(resultado);
 
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
            return res.status(500).json({ message: 'Erro interno ao atualizar tarefa' });
        }
    }
 
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
           
            if (!id) {
                return res.status(400).json({ message: 'ID é obrigatório' });
            }
 
            const tarefaId = Number(id);
            const tarefaRepository = AppDataSource.getRepository(Tarefa);
            const result = await tarefaRepository.delete(tarefaId);
 
            if (result.affected === 0) {
                return res.status(404).json({ message: 'Tarefa não encontrada' });
            }
 
            return res.status(200).json({ message: 'Tarefa deletada com sucesso' });
 
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            return res.status(500).json({ message: 'Erro interno ao deletar tarefa' });
        }
    }
}
 
export const tarefaController = new TarefaController();