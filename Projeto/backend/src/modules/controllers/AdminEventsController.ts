import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../config/database';
import { Evento } from '../models/Event';
import { User } from '../models/usuario';
import { EventoConvidado, StatusConvite } from '../models/EventoConvidado';
import { In } from 'typeorm';

const router = Router();
const eventoRepo = () => AppDataSource.getRepository(Evento);
const usuarioRepo = () => AppDataSource.getRepository(User);
const conviteRepo = () => AppDataSource.getRepository(EventoConvidado);

// Helper para formatar o evento com participantes
function formatEvento(evento: Evento) {
  return {
    id: evento.id,
    titulo: evento.titulo,
    descricao: evento.descricao,
    dataHora: evento.dataHora,
    participantes: (evento.convidados || []).map(c => ({
      idConvite: c.id,
      funcionario: c.funcionario ? {
        id: c.funcionario.id,
        nome: c.funcionario.nome,
        email: c.funcionario.email,
      } : null,
      status: c.status,
      motivo: c.motivo || null,
      criadoEm: c.criadoEm
    }))
  };
}

// GET /admin/events -> lista todos os eventos (com convidados)
export const listEvento =  async (req: Request, res: Response) => {
  try {
    const { q, status } = req.query;
    const qb = eventoRepo().createQueryBuilder('evento')
      .leftJoinAndSelect('evento.convidados', 'convite')
      .leftJoinAndSelect('convite.funcionario', 'funcionario');

    if (q && typeof q === 'string') {
      qb.andWhere('(LOWER(evento.titulo) LIKE :q OR LOWER(evento.descricao) LIKE :q)', { 
        q: `%${q.toLowerCase()}%` 
      });
    }

    if (status && typeof status === 'string') {
      qb.andWhere('convite.status = :status', { status });
    }

    const eventos = await qb.orderBy('evento.dataHora', 'DESC').getMany();
    
    // Formatar resposta
    const eventosFormatados = eventos.map(evento => formatEvento(evento));
    return res.json(eventosFormatados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
};

// GET /admin/events/:id -> pega um evento com convidados
export const listEventoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evento = await eventoRepo().findOne({
      where: { id: Number(id) },
      relations: ['convidados', 'convidados.funcionario']
    });

    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    return res.json(formatEvento(evento));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar evento' });
  }
};

// POST /admin/events -> cria evento
export const createEvento = async (req: Request, res: Response) => {
  try {
    const { titulo, descricao, dataHora, convidados } = req.body;
    
    const evento = eventoRepo().create({
      titulo,
      descricao,
      dataHora: dataHora ? new Date(dataHora) : new Date()
    });

    const saved = await eventoRepo().save(evento);

    // Criar convites se houver convidados
    if (Array.isArray(convidados) && convidados.length > 0) {
      const usuarios = await usuarioRepo().find({ where: { id: In(convidados) } });
      const convites = usuarios.map(u => {
        return conviteRepo().create({
          evento: saved,
          funcionario: u,
          status: StatusConvite.PENDENTE
        });
      });
      await conviteRepo().save(convites);
    }

    const eventoComConvidados = await eventoRepo().findOne({
      where: { id: saved.id },
      relations: ['convidados', 'convidados.funcionario']
    });

    return res.status(201).json(formatEvento(eventoComConvidados!));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar evento' });
  }
};

// PUT /admin/events/:id -> atualiza dados do evento
export const autualizaEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, dataHora } = req.body;

    const evento = await eventoRepo().findOneBy({ id: Number(id) });
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    evento.titulo = titulo ?? evento.titulo;
    evento.descricao = descricao ?? evento.descricao;
    evento.dataHora = dataHora ? new Date(dataHora) : evento.dataHora;

    await eventoRepo().save(evento);

    const atualizado = await eventoRepo().findOne({
      where: { id: Number(id) },
      relations: ['convidados', 'convidados.funcionario']
    });

    return res.json(formatEvento(atualizado!));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar evento' });
  }
};

// DELETE /admin/events/:id -> apaga o evento
export const deleteEvento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evento = await eventoRepo().findOneBy({ id: Number(id) });
    
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    await eventoRepo().delete(evento.id);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao deletar evento' });
  }
};

// POST /admin/events/:id/convidar -> adiciona convidados
export const adicionaConvidadosEvento =  async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { convidados } = req.body;

    const evento = await eventoRepo().findOneBy({ id: Number(id) });
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    if (!Array.isArray(convidados) || convidados.length === 0) {
      return res.status(400).json({ error: 'Envie um array de IDs de usuarios' });
    }

    const usuarios = await usuarioRepo().find({ where: { id: In(convidados) } });
    
    // Verificar se já existem convites para esses usuários
    const convitesExistentes = await conviteRepo().find({
      where: {
        evento: { id: evento.id },
        funcionario: { id: In(usuarios.map(u => u.id)) }
      }
    });

    const usuariosParaConvidar = usuarios.filter(u => 
      !convitesExistentes.some(ce => ce.funcionario.id === u.id)
    );

    const convites = usuariosParaConvidar.map(u => 
      conviteRepo().create({
        evento,
        funcionario: u,
        status: StatusConvite.PENDENTE
      })
    );

    await conviteRepo().save(convites);

    const eventoComConvidados = await eventoRepo().findOne({
      where: { id: evento.id },
      relations: ['convidados', 'convidados.funcionario']
    });

    return res.status(201).json(formatEvento(eventoComConvidados!));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao adicionar convidados' });
  }
};

// PATCH /admin/events/:eventId/convidado/:conviteId -> atualiza status/motivo
export const atualizaStatusEvento = async (req: Request, res: Response) => {
  try {
    const { conviteId } = req.params;
    const { status, motivo } = req.body;

    const convite = await conviteRepo().findOne({
      where: { id: Number(conviteId) },
      relations: ['evento', 'funcionario']
    });

    if (!convite) return res.status(404).json({ error: 'Convite não encontrado' });

    if (status && (Object.values(StatusConvite) as string[]).includes(status)) {
      if (status === StatusConvite.RECUSADO && (!motivo || String(motivo).trim() === '')) {
        return res.status(400).json({ error: 'Motivo é obrigatório ao recusar o convite' });
      }
      convite.status = status as StatusConvite;
    }

    if (motivo !== undefined) convite.motivo = motivo;

    await conviteRepo().save(convite);
    return res.json(convite);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao atualizar convite' });
  }
};

// DELETE /admin/events/:eventId/convidado/:conviteId -> remove convite
export const removeConviteEvento = async (req: Request, res: Response) => {
  try {
    const { conviteId } = req.params;
    const convite = await conviteRepo().findOneBy({ id: Number(conviteId) });
    
    if (!convite) return res.status(404).json({ error: 'Convite não encontrado' });

    await conviteRepo().delete(convite.id);
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao remover convite' });
  }
};
