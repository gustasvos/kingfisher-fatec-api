import { Router, Request, Response } from 'express'
import { AppDataSource } from '../../config/database';
import { Evento } from '../models/Evento';
import { User } from '../models/usuario';
import { EventoConvidado, StatusConvite } from '../models/EventoConvidado';
import { In } from 'typeorm';
import { EventoResposta } from '../models/eventoResposta';

const eventoRepo = () => AppDataSource.getRepository(Evento);
const usuarioRepo = () => AppDataSource.getRepository(User);
const conviteRepo = () => AppDataSource.getRepository(EventoConvidado);
const respostaRepo = () => AppDataSource.getRepository(EventoResposta);

// Helper para formatar o evento com participantes
function formatEvento(evento: Evento) {
  return {
    id: evento.id,
    titulo: evento.titulo,
    descricao: evento.descricao,
    dataHora: evento.dataHora,
    localizacao: evento.localizacao,
    participantes: (evento.convidados || []).map(c => ({
      idConvite: c.id,
      funcionario: c.funcionario ? {
        id: c.funcionario.id,
        nome: c.funcionario.nome,
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
    const { titulo, descricao, dataHora, localizacao, convidados } = req.body;
    
    const evento = eventoRepo().create({
      titulo,
      descricao,
      dataHora: dataHora ? new Date(dataHora) : new Date(),
      localizacao
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
    const { titulo, descricao, dataHora, localizacao } = req.body;

    const evento = await eventoRepo().findOneBy({ id: Number(id) });
    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });

    evento.titulo = titulo ?? evento.titulo;
    evento.descricao = descricao ?? evento.descricao;
    evento.dataHora = dataHora ? new Date(dataHora) : evento.dataHora;
    evento.localizacao = localizacao ?? evento.localizacao;

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

// GET /admin/invitations/user/:id -> lista os convites de um usuário específico
export const listConvitesByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const idNum = Number(id);

    if (isNaN(idNum)) {
      return res.status(400).json({ error: 'ID de usuário inválido' });
    }

    const convites = await conviteRepo().find({
      where: {
        funcionario: { id: idNum }
      },
      relations: ['evento']  // funcionario já vem no eager
    });

    if (convites.length === 0) {
      return res.status(404).json({ error: 'Nenhum convite encontrado para esse usuário' });
    }

    const convitesFormatados = convites.map(convite => ({
      idConvite: convite.id,
      status: convite.status,
      motivo: convite.motivo || null,
      criadoEm: convite.criadoEm,
      evento: {
        id: convite.evento.id,
        titulo: convite.evento.titulo,
        descricao: convite.evento.descricao,
        dataHora: convite.evento.dataHora,
        localizacao: convite.evento.localizacao,
      },
      funcionario: {
        id: convite.funcionario.id,
        nome: convite.funcionario.nome,
      }
    }));

    return res.json(convitesFormatados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar convites do usuário' });
  }
};

// GET /admin/events/respostas -> lista todas as respostas de eventos
export const listEventoRespostas = async (req: Request, res: Response) => {
  try {
    const respostas = await respostaRepo().find({
      relations: ['evento', 'usuario'],
      order: { id: 'DESC' }
    });

    if (!respostas || respostas.length === 0) {
      return res.status(404).json({ error: 'Nenhuma resposta encontrada' });
    }

    const respostasFormatadas = respostas.map(r => ({
      id: r.id,
      titulo_evento: r.titulo_evento,
      data_evento: r.data_evento,
      objetivo: r.objetivo,
      comentarios: r.comentarios,
      usuario: r.usuario ? {
        id: r.usuario.id,
        nome: r.usuario.nome,
        cargo: r.usuario.cargo
      } : null,
      evento: r.evento ? {
        id: r.evento.id,
        titulo: r.evento.titulo,
        dataHora: r.evento.dataHora,
        localizacao: r.evento.localizacao
      } : null
    }));

    return res.json(respostasFormatadas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar respostas de eventos' });
  }
};


// POST /admin/events/respostas -> cria uma nova resposta de evento
export const createEventoResposta = async (req: Request, res: Response) => {
  try {
    const { eventoId, usuarioId, titulo_evento, data_evento, objetivo, comentarios } = req.body;

    // Validações básicas
    if (!eventoId || !usuarioId) {
      return res.status(400).json({ error: 'eventoId e usuarioId são obrigatórios' });
    }

    const evento = await eventoRepo().findOneBy({ id: Number(eventoId) });
    const usuario = await usuarioRepo().findOneBy({ id: Number(usuarioId) });

    if (!evento) return res.status(404).json({ error: 'Evento não encontrado' });
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const resposta = respostaRepo().create({
      titulo_evento: titulo_evento ?? evento.titulo,
      data_evento: data_evento ? new Date(data_evento) : evento.dataHora,
      objetivo: objetivo ?? '',
      comentarios: comentarios ?? '',
      evento,
      usuario
    });

    const saved = await respostaRepo().save(resposta);

    return res.status(201).json({
      id: saved.id,
      titulo_evento: saved.titulo_evento,
      data_evento: saved.data_evento,
      objetivo: saved.objetivo,
      comentarios: saved.comentarios,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        cargo: usuario.cargo
      },
      evento: {
        id: evento.id,
        titulo: evento.titulo,
        dataHora: evento.dataHora,
        localizacao: evento.localizacao
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar resposta de evento' });
  }
};
