import express from 'express'
import { createCliente, listCliente, listClienteById, listClientesComUltimoStatus, updateCliente, deleteCliente, updateClienteCategoria} from "../controllers/clienteController"
import { autenticarUsuario } from '../../middlewares/auth.middleware'
import { autorizarUsuario } from '../../middlewares/autorizar.middleware'

const router = express.Router()

router.post('/cliente/create', autenticarUsuario, autorizarUsuario(['comercial']), createCliente)
router.get('/cliente/list', autenticarUsuario, autorizarUsuario(['comercial']), listCliente);
router.get('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), listClienteById);
router.get('/cliente/comercial/:id', autenticarUsuario, autorizarUsuario(['comercial']), listClientesComUltimoStatus);
router.put('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), updateCliente);
router.delete('/cliente/:id', autenticarUsuario, autorizarUsuario(['comercial']), deleteCliente);
router.patch('/cliente/:id/categoria', autenticarUsuario, autorizarUsuario(['comercial']), updateClienteCategoria);

export default router