import { Request, Response } from "express"
import { AppDataSource } from "../../config/database"
import { RegistroCliente } from "../models/registroCliente"
import { Cliente } from "../models/cliente"
import { ClienteCategoria } from "../models/clienteCategoria"
import { User } from "../models/usuario"

//Rota: GET /registro_cliente/comercial/:id_usuario
export const listRegistroByComercial = async (req: Request, res: Response) => {
    try {
        const { id_usuario } = req.params
        const user = req.user // vem do middleware de autenticação

        const registroRepository = AppDataSource.getRepository(RegistroCliente)
        const clienteRepository = AppDataSource.getRepository(Cliente)

        //Admin-comercial pode ver tudo
        if (user?.cargo === "admin-comercial") {
            const registros = await registroRepository.find({
                relations: ["cliente", "categoria"],
                order: { data_registro: "DESC" },
            })
            return res.status(200).json(registros)
        }

        // Comercial comum: só vê os registros dos seus clientes
        const clientesDoColaborador = await clienteRepository.find({
            where: { colaborador_id: parseInt(id_usuario!) },
        })


        if (clientesDoColaborador.length === 0) {
            return res.status(200).json([])
        }

        const clienteIds = clientesDoColaborador.map((c) => c.id)

        const registros = await registroRepository
            .createQueryBuilder("registro")
            .leftJoinAndSelect("registro.cliente", "cliente")
            .leftJoinAndSelect("registro.categoria", "categoria")
            .where("registro.cliente_id IN (:...clienteIds)", { clienteIds })
            .orderBy("registro.data_registro", "DESC")
            .getMany()

        return res.status(200).json(registros)
    } catch (error) {
        console.error("Erro ao listar registros:", error)
        return res.status(500).json({ message: "Erro ao listar registros de interação" })
    }
}

export const updateRegistro = async (req: Request, res: Response) => {
  try {
    const { id_registro_cliente } = req.params
    const { cliente_id, categoria_id, data_registro, observacao } = req.body
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const categoriaRepository = AppDataSource.getRepository(ClienteCategoria)

    const registro = await registroRepository.findOne({
      where: { id: parseInt(id_registro_cliente!) },
      relations: ["cliente", "categoria"],
    })

    if (!registro) {
      return res.status(404).json({ message: "Registro não encontrado" })
    }

    // Verifica se o colaborador é dono do cliente (exceto admin-comercial)
    if (user?.cargo !== "admin-comercial") {
      const clienteDono = await clienteRepository.findOneBy({
        id: registro.cliente.id,
      })

      if (clienteDono?.colaborador_id !== user!.id) {
        return res
          .status(403)
          .json({ message: "Acesso negado: este cliente não pertence a você." })
      }
    }

    // Valida cliente e categoria
    const cliente = await clienteRepository.findOneBy({ id: cliente_id })
    if (!cliente) return res.status(400).json({ message: "Cliente inválido" })

    const categoria = await categoriaRepository.findOneBy({ id: categoria_id })
    if (!categoria)
      return res.status(400).json({ message: "Categoria inválida" })

    // Atualiza o registro
    registro.cliente = cliente
    registro.categoria = categoria
    registro.data_registro = new Date(data_registro)
    registro.observacao = observacao

    const atualizado = await registroRepository.save(registro)

    return res.status(200).json({
      message: "Registro atualizado com sucesso!",
      registro: atualizado,
    })
  } catch (error) {
    console.error("Erro ao atualizar registro:", error)
    return res.status(500).json({ message: "Erro ao atualizar registro" })
  }
}

export const deleteRegistro = async (req: Request, res: Response) => {
  try {
    const { id_registro_cliente } = req.params
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)

    const registro = await registroRepository.findOne({
      where: { id: parseInt(id_registro_cliente!) },
      relations: ["cliente"],
    })

    if (!registro) {
      return res.status(404).json({ message: "Registro não encontrado" })
    }

    // Só o dono ou admin-comercial pode deletar
    if (user?.cargo !== "admin-comercial") {
      const clienteDono = await clienteRepository.findOneBy({
        id: registro.cliente.id,
      })

      if (clienteDono?.colaborador_id !== user!.id) {
        return res
          .status(403)
          .json({ message: "Acesso negado: este cliente não pertence a você." })
      }
    }

    await registroRepository.remove(registro)

    return res.status(200).json({ message: "Registro deletado com sucesso" })
  } catch (error) {
    console.error("Erro ao deletar registro:", error)
    return res.status(500).json({ message: "Erro ao deletar registro" })
  }
}

export const createRegistro = async (req: Request, res: Response) => {
  try {
    const { cliente_id, categoria_id, data_registro, observacao } = req.body
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const categoriaRepository = AppDataSource.getRepository(ClienteCategoria)

    // Valida cliente
    const cliente = await clienteRepository.findOneBy({ id: cliente_id })
    if (!cliente) return res.status(400).json({ message: "Cliente inválido" })

    // Verifica se o colaborador é dono do cliente (exceto admin-comercial)
    if (user?.cargo !== "admin-comercial" && cliente.colaborador_id !== user!.id) {
      return res
        .status(403)
        .json({ message: "Acesso negado: este cliente não pertence a você." })
    }

    // Valida categoria
    const categoria = await categoriaRepository.findOneBy({ id: categoria_id })
    if (!categoria) return res.status(400).json({ message: "Categoria inválida" })

    // Cria novo registro
    const novoRegistro = registroRepository.create({
      cliente,
      categoria,
      data_registro: new Date(data_registro),
      observacao: observacao || "",
    })

    const salvo = await registroRepository.save(novoRegistro)

    return res.status(201).json({
      message: "Registro criado com sucesso!",
      registro: salvo,
    })
  } catch (error) {
    console.error("Erro ao criar registro:", error)
    return res.status(500).json({ message: "Erro ao criar registro" })
  }
}