import { Request, Response } from "express"
import { AppDataSource } from "../../config/database"
import { RegistroCliente } from "../models/registroCliente"
import { Cliente } from "../models/cliente"
import { ClienteCategoria } from "../models/clienteCategoria"

//Rota: GET /registroCliente/comercial/:id_usuario
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
                order: { dataRegistro: "DESC" },
            })
            return res.status(200).json(registros)
        }

        // Comercial comum: só vê os registros dos seus clientes
        const clientesDoColaborador = await clienteRepository.find({
            where: { colaboradorId: parseInt(id_usuario!) },
        })


        if (clientesDoColaborador.length === 0) {
            return res.status(200).json([])
        }

        const clienteIds = clientesDoColaborador.map((c) => c.id)

        const registros = await registroRepository
            .createQueryBuilder("registro")
            .leftJoinAndSelect("registro.cliente", "cliente")
            .leftJoinAndSelect("registro.categoria", "categoria")
            .where("registro.clienteId IN (:...clienteIds)", { clienteIds })
            .orderBy("registro.dataRegistro", "DESC")
            .getMany()

        return res.status(200).json(registros)
    } catch (error) {
        console.error("Erro ao listar registros:", error)
        return res.status(500).json({ message: "Erro ao listar registros de interação" })
    }
}

// Rota: GET /registroCliente/cliente/:clienteId
export const listRegistroByCliente = async (req: Request, res: Response) => {
  try {
    const { clienteId } = req.params
    const user = req.user // autenticado pelo middleware

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)

    // Busca cliente e valida acesso
    const cliente = await clienteRepository.findOneBy({ id: parseInt(clienteId!) })
    if (!cliente) {
      return res.status(404).json({ message: "Cliente não encontrado" })
    }

    // Só o dono do cliente ou admin-comercial pode ver
    if (user?.cargo !== "admin-comercial" && cliente.colaboradorId !== user!.id) {
      return res.status(403).json({ message: "Acesso negado" })
    }

    // Busca registros
    const registros = await registroRepository.find({
      where: { cliente: { id: parseInt(clienteId!) } },
      relations: ["cliente", "categoria"],
      order: { dataRegistro: "DESC" },
    })

    // Mapeia para o formato usado no front
    const resposta = registros.map((r) => ({
      id: r.id,
      categoria: r.categoria?.categoria || "—",
      data: r.dataRegistro,
      contato: r.cliente?.contatoResponsavel || "—",
      observacao: r.observacao || "—",
    }))

    return res.status(200).json(resposta)
  } catch (error) {
    console.error("Erro ao listar registros por cliente:", error)
    return res.status(500).json({ message: "Erro ao listar registros por cliente" })
  }
}


export const updateRegistro = async (req: Request, res: Response) => {
  try {
    const { id_registroCliente } = req.params
    const { clienteId, categoriaId, dataRegistro, observacao } = req.body
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const categoriaRepository = AppDataSource.getRepository(ClienteCategoria)

    const registro = await registroRepository.findOne({
      where: { id: parseInt(id_registroCliente!) },
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

      if (clienteDono?.colaboradorId !== user!.id) {
        return res
          .status(403)
          .json({ message: "Acesso negado: este cliente não pertence a você." })
      }
    }

    // Valida cliente e categoria
    const cliente = await clienteRepository.findOneBy({ id: clienteId })
    if (!cliente) return res.status(400).json({ message: "Cliente inválido" })

    const categoria = await categoriaRepository.findOneBy({ id: categoriaId })
    if (!categoria)
      return res.status(400).json({ message: "Categoria inválida" })

    // Atualiza o registro
    registro.cliente = cliente
    registro.categoria = categoria
    registro.dataRegistro = new Date(dataRegistro)
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
    const { id_registroCliente } = req.params
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)

    const registro = await registroRepository.findOne({
      where: { id: parseInt(id_registroCliente!) },
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

      if (clienteDono?.colaboradorId !== user!.id) {
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
    const { clienteId, categoriaId, dataRegistro, observacao } = req.body
    const user = req.user

    const registroRepository = AppDataSource.getRepository(RegistroCliente)
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const categoriaRepository = AppDataSource.getRepository(ClienteCategoria)

    // Valida cliente
    const cliente = await clienteRepository.findOneBy({ id: clienteId })
    if (!cliente) return res.status(400).json({ message: "Cliente inválido" })

    // Verifica se o colaborador é dono do cliente (exceto admin-comercial)
    if (user?.cargo !== "admin-comercial" && cliente.colaboradorId !== user!.id) {
      return res
        .status(403)
        .json({ message: "Acesso negado: este cliente não pertence a você." })
    }

    // Valida categoria
    const categoria = await categoriaRepository.findOneBy({ id: categoriaId })
    if (!categoria) return res.status(400).json({ message: "Categoria inválida" })

    // Cria novo registro
    const novoRegistro = registroRepository.create({
      cliente,
      categoria,
      dataRegistro: new Date(dataRegistro),
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