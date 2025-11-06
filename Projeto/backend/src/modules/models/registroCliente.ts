import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cliente } from './cliente'
import { ClienteCategoria } from './clienteCategoria'

@Entity('registro_cliente')
export class RegistroCliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cliente_id: number

    @Column()
    categoria_id: number

    @Column({ type: 'date' })
    data_registro: Date

    @Column({ type: 'varchar', length: 500 })
    observacao: string

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente

    @ManyToOne(() => ClienteCategoria)
    @JoinColumn({ name: 'categoria_id' })
    categoria: ClienteCategoria    
}
