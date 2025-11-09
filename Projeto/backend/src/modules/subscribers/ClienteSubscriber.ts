import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm"
import { Cliente } from "../models/cliente"
import { RegistroCliente } from "../models/registroCliente"
import { ClienteCategoria } from "../models/clienteCategoria"
import { CategoriaFunil } from '../../utils/enums/categoriaFunil'

@EventSubscriber()
export class ClienteSubscriber implements EntitySubscriberInterface<Cliente> {

    listenTo() {
        return Cliente
    }

    async afterInsert(event: InsertEvent<Cliente>) {
        const registroRepository = event.manager.getRepository(RegistroCliente)
        const categoriaRepository = event.manager.getRepository(ClienteCategoria)

        // Busca a categoria PROSPECT
        let prospectCategoria = await categoriaRepository.findOne({
            where: { categoria: CategoriaFunil.PROSPECT }
        })

        if (!prospectCategoria) {
            prospectCategoria = categoriaRepository.create({ categoria: CategoriaFunil.PROSPECT })
            await categoriaRepository.save(prospectCategoria)
        }

        const nowUTC = new Date()
        const nowSP = new Date(nowUTC.getTime() - 3 * 60 * 60 * 1000) // subtrai 3 horas

        const novoRegistro = registroRepository.create({
            clienteId: event.entity.id,
            categoriaId: prospectCategoria.id,
            dataRegistro: nowSP,
            observacao: ""
        })

        await registroRepository.save(novoRegistro)
    }
}
