import express from 'express'
import { createUsuario, listUsuario,listUsuarioById, updateUsuario, deleteUsuario, loginUsuario, logoutUsuario } from '../controllers/UsersControllers'

const router = express.Router()

router.post('/usuario/create', createUsuario)
router.post('/login', loginUsuario)
router.post('/logout', logoutUsuario)
router.get('/usuario/list', listUsuario);
router.get('/usuario/:id', listUsuarioById);
router.put('/usuario/:id', updateUsuario);
router.delete('/usuario/:id', deleteUsuario);


export default router