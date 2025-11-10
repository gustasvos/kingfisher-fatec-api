// src/modules/models/Tarefa.ts
export interface Tarefa {
  id?: number;
  cliente_id: number;
  vendedor_id: number;
  titulo: string;
  data: string;
  status: 'pendente' | 'em_andamento' | 'concluida';
  tipo?: string;
  descricao?: string;
  created_at?: string;
}

export interface TarefaWithCliente extends Tarefa {
  cliente_nome?: string;
  ContatoResponsavel?: string;
  NomeFantasia?: string;
}

export interface CreateTarefaData {
  cliente_id: number;
  titulo: string;
  data: string;
  status?: 'pendente' | 'em_andamento' | 'concluida';
  tipo?: string;
  descricao?: string;
  vendedor_id: number;
}

export interface UpdateTarefaData {
  titulo?: string;
  data?: string;
  status?: 'pendente' | 'em_andamento' | 'concluida';
  tipo?: string;
  descricao?: string;
}