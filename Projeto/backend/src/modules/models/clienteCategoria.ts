import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { CategoriaFunil } from '../../utils/enums/categoriaFunil'

@Entity('cliente_categoria')
export class ClienteCategoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'enum', enum: CategoriaFunil })
    categoria: CategoriaFunil

}
