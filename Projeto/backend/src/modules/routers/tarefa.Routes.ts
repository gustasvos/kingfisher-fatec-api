import { Router } from 'express';
import { tarefaController } from '../controllers/tarefaController';
 
const router = Router();
 
router.post('/tarefas', tarefaController.create);
router.get('/tarefas/pendentes', tarefaController.getPendentesVendedor);
router.get('/tarefas/:id', tarefaController.getById);
router.put('/tarefas/:id', tarefaController.update);
router.delete('/tarefas/:id', tarefaController.delete);

 
export default router;