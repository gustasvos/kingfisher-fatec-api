import express from 'express'
import { createUsuario, listUsuario,listUsuarioById, updateUsuario, deleteUsuario, loginUsuario, logoutUsuario, checkIfUsersExist } from '../controllers/UsersControllers'
import { autenticarUsuario } from '../../middlewares/auth.middleware'
import { autorizarUsuario } from '../../middlewares/autorizar.middleware'

const router = express.Router()

//autenticarUsuario, autorizarUsuario(['admin','usuario']),
router.post('/usuario/create', createUsuario)
router.post('/login', loginUsuario)
router.post('/logout', autenticarUsuario, logoutUsuario)
router.get('/usuario/list', listUsuario);
router.get('/usuario/:id', autenticarUsuario, listUsuarioById);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);
router.get("/users/exists", checkIfUsersExist);

export default router