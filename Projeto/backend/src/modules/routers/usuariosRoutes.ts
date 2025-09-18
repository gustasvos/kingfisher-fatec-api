import express from 'express'
import { createUsuario, listUsuario,listUsuarioById, updateUsuario, deleteUsuario } from '../controllers/UsersControllers'

const router = express.Router()
/*
import { authenticate } from "./middlewares/authMiddleware";
import { authorize } from "./middlewares/authorize";

// Somente 'admin' pode listar todos os usuários
router.get("/usuarios", authenticate, authorize(["admin"]), listUsuario);

// Qualquer usuário logado pode ver seu próprio perfil, ou admin ver qualquer um
router.get("/usuarios/:id", authenticate, listUsuarioById);

// Somente admin ou comercial podem editar usuários
router.put("/usuarios/:id", authenticate, authorize(["admin", "comercial"]), updateUsuario);

// Somente admin pode deletar usuários
router.delete("/usuarios/:id", authenticate, authorize(["admin"]), deleteUsuario);

*/
router.post('/usuario/create', createUsuario)
router.get('/usuario/list', listUsuario)
router.get('/usuario/:id', listUsuarioById)
router.put('/usuario/:id', updateUsuario)
router.delete('/usuario/:id', deleteUsuario)

export default router