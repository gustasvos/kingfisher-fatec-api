import express from 'express'
import { createUsuario, listUsuario,listUsuarioById, updateUsuario, deleteUsuario, loginUsuario, logoutUsuario } from '../controllers/UsersControllers'
import { autenticarUsuario } from '../../middlewares/auth.middleware'
import { autorizarUsuario } from '../../middlewares/autorizar.middleware'

const router = express.Router()

router.post('/usuario/create', createUsuario)
router.post('/login', loginUsuario)
router.post('/logout', autenticarUsuario, logoutUsuario)
router.get('/usuario/list', autenticarUsuario, autorizarUsuario(['admin']), listUsuario);
router.get('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin','usuario']), listUsuarioById);
router.put('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin','usuario']), updateUsuario);
router.delete('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin','usuario']), deleteUsuario);

export default router