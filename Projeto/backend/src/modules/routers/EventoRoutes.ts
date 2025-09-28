import { Router } from 'express';
import{ createEvento, listEvento, listEventoById, autualizaEvento, deleteEvento, adicionaConvidadosEvento, atualizaStatusEvento, removeConviteEvento, listConvitesByUser } from '../controllers/AdminEventsController';

const router = Router();

router.get('/admin/events', listEvento)
router.get('/admin/events/:id', listEventoById)
router.post('/admin/events', createEvento)
router.put('/admin/events/:id', autualizaEvento)
router.delete('/admin/events/:id', deleteEvento)
router.post('/admin/events/:id/convidar', adicionaConvidadosEvento)
router.patch('/admin/events/:eventId/convidado/:conviteId', atualizaStatusEvento)
router.delete('/admin/events/:eventId/convidado/:conviteId', removeConviteEvento)
router.get('/admin/events/convidado/:id', listConvitesByUser)

export default router