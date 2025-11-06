import express from 'express'
import { createCliente, listCliente, listlienteById, updateliente, deleteliente, updateClienteCategoria} from "../controllers/clienteController"
import { autenticarUsuario } from '../../middlewares/auth.middleware'
import { autorizarUsuario } from '../../middlewares/autorizar.middleware'

const router = express.Router()

router.post('/cliente/create', autenticarUsuario, autorizarUsuario(['comercial']), createCliente)
router.get('/cliente/list', autenticarUsuario, autorizarUsuario(['comercial']), listCliente);
router.get('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), listlienteById);
router.put('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), updateliente);
router.delete('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), deleteliente);
router.patch('/cliente/:id/categoria', autenticarUsuario, autorizarUsuario(['comercial']), updateClienteCategoria);

export default router