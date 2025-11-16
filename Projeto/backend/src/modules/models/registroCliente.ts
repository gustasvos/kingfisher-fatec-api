import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cliente } from './cliente'
import { ClienteCategoria } from './clienteCategoria'

@Entity('registroCliente')
export class RegistroCliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clienteId: number

    @Column()
    categoriaId: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataRegistro: Date

    @Column({ type: 'varchar', length: 500, default: 'Novo contato registrado' })
    observacao: string

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'clienteId' })
    cliente: Cliente

    @ManyToOne(() => ClienteCategoria, (categoria) => categoria.registros)
    @JoinColumn({ name: 'categoriaId' })
    categoria: ClienteCategoria    
}
