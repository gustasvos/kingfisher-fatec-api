import express from "express"
import { createCotacao, listCotacoes, listCotacaoById, updateCotacao, deleteCotacao, enviarEmailCotacao, getCotacoesByUsuario, getUltimaCotacaoByCliente } from "../controllers/cotacaoController"
import { autenticarUsuario } from "../../middlewares/auth.middleware"
import { autorizarUsuario } from "../../middlewares/autorizar.middleware"

const router = express.Router()

router.post( "/cotacao/create", autenticarUsuario, autorizarUsuario(["comercial"]), createCotacao )
router.get( "/cotacao/list", autenticarUsuario, autorizarUsuario(["comercial"]), listCotacoes )
router.get( "/cotacao/:id", autenticarUsuario, autorizarUsuario(["comercial"]), listCotacaoById )
router.put( "/cotacao/:id", autenticarUsuario, autorizarUsuario(["comercial"]), updateCotacao )
router.delete( "/cotacao/:id", autenticarUsuario, autorizarUsuario(["comercial"]), deleteCotacao )

router.post("/cotacao/enviar-email", autenticarUsuario, autorizarUsuario(["comercial"]), enviarEmailCotacao)
router.get("/cotacao/list/:usuarioId", autenticarUsuario, autorizarUsuario(["comercial"]), getCotacoesByUsuario)
router.get("/cotacao/ultima/:clienteId", autenticarUsuario, autorizarUsuario(["comercial"]), getUltimaCotacaoByCliente)

export default router
