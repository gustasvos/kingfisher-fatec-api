import express from "express"
import { autenticarUsuario } from "../../middlewares/auth.middleware"
import { autorizarUsuario } from "../../middlewares/autorizar.middleware"
import {
  listRegistroByComercial,
  updateRegistro,
  deleteRegistro,
  createRegistro
} from "./../controllers/registroClienteController"

const router = express.Router()

// Listar histórico de interações de um colaborador
router.get(
  "/registroCliente/comercial/:id_usuario",
  autenticarUsuario,
  autorizarUsuario(["comercial", "admin-comercial"]),
  listRegistroByComercial
)

// Atualizar um registro
router.put(
  "/registroCliente/:id_registroCliente",
  autenticarUsuario,
  autorizarUsuario(["comercial", "admin-comercial"]),
  updateRegistro
)

// Deletar um registro
router.delete(
  "/registroCliente/:id_registroCliente",
  autenticarUsuario,
  autorizarUsuario(["comercial", "admin-comercial"]),
  deleteRegistro
)

// Criar um novo registro
router.post(
  "/registroCliente",
  autenticarUsuario,
  autorizarUsuario(["comercial", "admin-comercial"]),
  createRegistro
)


export default router
