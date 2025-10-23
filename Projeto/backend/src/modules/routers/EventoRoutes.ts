import { Router } from 'express';
import{ createEvento, listEvento, listEventoById, autualizaEvento, deleteEvento, adicionaConvidadosEvento, atualizaStatusEvento, removeConviteEvento, listConvitesByUser, listEventoRespostas, createEventoResposta, getEventoRespostaById } from '../controllers/AdminEventsController';

const router = Router();

// respostas deve vir antes das rotas /:id
router.get('/admin/events/respostas', listEventoRespostas);
router.post('/admin/events/respostas/:eventoId/participante/:usuarioId', createEventoResposta);
router.get('/admin/events/respostas/:id', getEventoRespostaById);

router.get('/admin/events', listEvento);
router.post('/admin/events', createEvento);
router.get('/admin/events/:id', listEventoById);
router.put('/admin/events/:id', autualizaEvento);
router.delete('/admin/events/:id', deleteEvento);
router.post('/admin/events/:id/convidar', adicionaConvidadosEvento);
router.patch('/admin/events/:eventId/convidado/:conviteId', atualizaStatusEvento);
router.delete('/admin/events/:eventId/convidado/:conviteId', removeConviteEvento);
router.get('/admin/events/convidado/:id', listConvitesByUser);

export default router;
