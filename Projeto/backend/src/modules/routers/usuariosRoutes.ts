import express from 'express'
import { createUsuario, listUsuario,listUsuarioById, updateUsuario, deleteUsuario, loginUsuario, logoutUsuario, checkIfUsersExist } from '../controllers/UsersControllers'
import { autenticarUsuario } from '../../middlewares/auth.middleware'
import { autorizarUsuario } from '../../middlewares/autorizar.middleware'

const router = express.Router()

//autenticarUsuario, autorizarUsuario(['admin','usuario']),
router.post('/usuario/create', createUsuario)
router.post('/login', loginUsuario)
router.post('/logout', logoutUsuario)
router.get('/usuario/list', autenticarUsuario, autorizarUsuario(['admin']), listUsuario);
router.get('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin','usuario']), listUsuarioById);
router.put('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin','usuario']), updateUsuario);
router.delete('/usuario/:id', autenticarUsuario, autorizarUsuario(['admin']), deleteUsuario);
router.get("/users/exists", autenticarUsuario, autorizarUsuario(['admin','comercial','operacional']), checkIfUsersExist);

export default router