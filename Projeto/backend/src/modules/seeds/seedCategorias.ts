import { AppDataSource } from "../../config/database"
import { ClienteCategoria } from "../../modules/models/clienteCategoria"
import { CategoriaFunil } from "../../utils/enums/categoriaFunil"

export async function seedCategorias() {
    const categoriaRepository = AppDataSource.getRepository(ClienteCategoria)

    for (const key in CategoriaFunil) {
        const categoriaValue = CategoriaFunil[key as keyof typeof CategoriaFunil]

        // Verifica se já existe no banco
        const exists = await categoriaRepository.findOne({
            where: { categoria: categoriaValue }
        })

        if (!exists) {
            const novaCategoria = categoriaRepository.create({ categoria: categoriaValue })
            await categoriaRepository.save(novaCategoria)
            console.log(`Categoria inserida: ${categoriaValue}`)
        }
    }

    console.log("Seed de categorias concluído!")
}
