import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { CategoriaFunil } from '../../utils/enums/categoriaFunil'
import { RegistroCliente } from './registroCliente';

@Entity('cliente_categoria')
export class ClienteCategoria {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'enum', enum: CategoriaFunil })
    categoria: CategoriaFunil

    @OneToMany(() => RegistroCliente, (registro: RegistroCliente) => registro.categoria)
    registros: RegistroCliente[]
}
