import { Request, Response } from 'express'
import { AppDataSource } from '../../config/database'
import { UsuarioLocal } from '../models/UsuarioLocal'
import { Between } from 'typeorm'

// POST /usuario/:usuarioId/local
export const registrarLocalTrabalho = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { local } = req.body

    if (!local) {
      return res.status(400).json({ message: "Local é obrigatório" })
    }

    const usuarioLocalRepository = AppDataSource.getRepository(UsuarioLocal)

    // Criando range do dia (00:00 até 23:59:59)
    const hoje = new Date()
    const inicioDia = new Date(hoje.setHours(0, 0, 0, 0))
    const fimDia = new Date(hoje.setHours(23, 59, 59, 999))

    // Verifica se já existe registro no dia
    const registroExistente = await usuarioLocalRepository.findOne({
      where: {
        usuario: { id: Number(id) },
        data: Between(inicioDia, fimDia),
      },
    })

    if (registroExistente) {
      return res.json({
        message: "Local já registrado hoje. Nenhuma alteração necessária.",
      })
    }

    const novoRegistro = usuarioLocalRepository.create({
      local,
      data: new Date(),
      usuario: { id: Number(id) },
    })

    await usuarioLocalRepository.save(novoRegistro)

    return res.status(201).json({
      message: "Local registrado com sucesso!",
      novoRegistro,
    })
  } catch (error) {
    console.error("Erro ao registrar local:", error)
    return res.status(500).json({ message: "Erro ao registrar local de trabalho" })
  }
}


// GET /usuario/:usuarioId/local/check
export const checkUsuarioLocalHoje = async (req: Request, res: Response) => {
  try {
    const usuarioId = Number(req.params.id)
    const usuarioLocalRepository = AppDataSource.getRepository(UsuarioLocal)

    const hoje = new Date()
    const inicioDia = new Date(hoje.setHours(0, 0, 0, 0))
    const fimDia = new Date(hoje.setHours(23, 59, 59, 999))

    const registroHoje = await usuarioLocalRepository.findOne({
      where: {
        usuario: { id: usuarioId },
        data: Between(inicioDia, fimDia),
      },
    })

    return res.json({
      mostrarModal: !registroHoje,
    })
  } catch (error) {
    console.error("Erro ao verificar local:", error)
    return res.status(500).json({ message: "Erro ao verificar local do usuário" })
  }
}
