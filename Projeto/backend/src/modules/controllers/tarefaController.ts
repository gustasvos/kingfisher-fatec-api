// src/modules/controllers/tarefaController.ts
import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { Tarefa, CreateTarefaData, UpdateTarefaData } from '../models/Tarefa';

const TAREFAS_CSV_PATH = path.join(__dirname, '../../../data/Tarefas.csv');

// Garantir que o diretório data existe
const ensureDataDir = () => {
  const dataDir = path.dirname(TAREFAS_CSV_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Ler tarefas do CSV
const readTarefasFromCSV = (): Tarefa[] => {
  ensureDataDir();
  
  if (!fs.existsSync(TAREFAS_CSV_PATH)) {
    return [];
  }

  try {
    const csvData = fs.readFileSync(TAREFAS_CSV_PATH, 'utf-8');
    const lines = csvData.trim().split('\n');
    if (lines.length <= 1) return [];

    const headersLine = lines[0];
    if (!headersLine) return [];
    
    const headers = headersLine.split(',').map(h => h.trim());
    const tarefas: Tarefa[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i];
      if (!currentLine) continue;
      
      const values = currentLine.split(',').map(v => v.trim());
      const tarefa: any = {};
      
      headers.forEach((header, index) => {
        tarefa[header] = values[index] || '';
      });

      // Converter tipos numéricos
      if (tarefa.id) tarefa.id = parseInt(tarefa.id);
      if (tarefa.cliente_id) tarefa.cliente_id = parseInt(tarefa.cliente_id);
      if (tarefa.vendedor_id) tarefa.vendedor_id = parseInt(tarefa.vendedor_id);

      tarefas.push(tarefa);
    }

    return tarefas;
  } catch (error) {
    console.error('Erro ao ler CSV de tarefas:', error);
    return [];
  }
};

// Escrever tarefas no CSV
const writeTarefasToCSV = (tarefas: Tarefa[]): void => {
  ensureDataDir();
  
  const headers = ['id', 'cliente_id', 'vendedor_id', 'titulo', 'data', 'status', 'tipo', 'descricao', 'created_at'];
  let csvContent = headers.join(',') + '\n';

  tarefas.forEach(tarefa => {
    const row = headers.map(header => {
      const value = tarefa[header as keyof Tarefa];
      return value !== undefined ? String(value) : '';
    });
    csvContent += row.join(',') + '\n';
  });

  fs.writeFileSync(TAREFAS_CSV_PATH, csvContent);
};

export const tarefaController = {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { cliente_id, titulo, data, status, tipo, descricao, vendedor_id }: CreateTarefaData = req.body;

      if (!cliente_id || !titulo || !data || !vendedor_id) {
        res.status(400).json({
          success: false,
          message: 'Campos obrigatórios: cliente_id, titulo, data, vendedor_id'
        });
        return;
      }

      const tarefas = readTarefasFromCSV();
      
      const maxId = tarefas.length > 0 
        ? Math.max(...tarefas.map(t => t.id || 0)) 
        : 0;
        
      const novaTarefa: Tarefa = {
        id: maxId + 1,
        cliente_id,
        vendedor_id,
        titulo,
        data,
        status: status || 'pendente',
        tipo: tipo || '',
        descricao: descricao || '',
        created_at: new Date().toISOString()
      };

      tarefas.push(novaTarefa);
      writeTarefasToCSV(tarefas);

      res.status(201).json({
        success: true,
        message: 'Tarefa criada com sucesso!',
        data: novaTarefa
      });

    } catch (error: any) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  },

  async getTarefasPendentes(req: Request, res: Response): Promise<void> {
    try {
      const { vendedor_id } = req.query;

      if (!vendedor_id) {
        res.status(400).json({
          success: false,
          message: 'Parâmetro vendedor_id é obrigatório'
        });
        return;
      }

      const tarefas = readTarefasFromCSV();
      const tarefasPendentes = tarefas.filter(tarefa => 
        tarefa.vendedor_id === parseInt(vendedor_id as string) && 
        tarefa.status !== 'concluida'
      );

      res.json({
        success: true,
        data: tarefasPendentes
      });

    } catch (error: any) {
      console.error('Erro ao buscar tarefas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  },

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      
      const taskId = parseInt(id || '0');
      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }
      
      const tarefas = readTarefasFromCSV();
      const tarefa = tarefas.find(t => t.id === taskId);

      if (!tarefa) {
        res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
        return;
      }

      res.json({
        success: true,
        data: tarefa
      });

    } catch (error: any) {
      console.error('Erro ao buscar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  },

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateTarefaData = req.body;

      const taskId = parseInt(id || '0');
      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      const tarefas = readTarefasFromCSV();
      const tarefaIndex = tarefas.findIndex(t => t.id === taskId);

      if (tarefaIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
        return;
      }

      // CORREÇÃO FINAL: Usar non-null assertion operator (!) pois sabemos que o índice existe
      const tarefaAtual = tarefas[tarefaIndex]!;
      
      const tarefaAtualizada: Tarefa = {
        ...tarefaAtual,
        ...updateData,
        // Garantir que propriedades obrigatórias não sejam undefined
        cliente_id: tarefaAtual.cliente_id,
        vendedor_id: tarefaAtual.vendedor_id,
        titulo: updateData.titulo || tarefaAtual.titulo,
        data: updateData.data || tarefaAtual.data,
        status: updateData.status || tarefaAtual.status
      };

      tarefas[tarefaIndex] = tarefaAtualizada;
      writeTarefasToCSV(tarefas);

      res.json({
        success: true,
        message: 'Tarefa atualizada com sucesso!',
        data: tarefaAtualizada
      });

    } catch (error: any) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  },

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const taskId = parseInt(id || '0');
      if (isNaN(taskId)) {
        res.status(400).json({
          success: false,
          message: 'ID inválido'
        });
        return;
      }

      const tarefas = readTarefasFromCSV();
      const tarefaIndex = tarefas.findIndex(t => t.id === taskId);

      if (tarefaIndex === -1) {
        res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
        return;
      }

      tarefas.splice(tarefaIndex, 1);
      writeTarefasToCSV(tarefas);

      res.json({
        success: true,
        message: 'Tarefa deletada com sucesso!'
      });

    } catch (error: any) {
      console.error('Erro ao deletar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor',
        error: error.message
      });
    }
  }
};