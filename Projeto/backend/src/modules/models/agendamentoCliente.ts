import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cliente } from './cliente'

@Entity('agendamento_cliente')
export class AgendamentoCliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    clienteId: number

    @Column({ type: 'varchar', length: 50 })
    titulo: string

    @Column({ type: 'datetime' })
    dataAgendamento: Date

    @Column({ type: 'varchar', length: 500})
    descricao?: string

    @Column({ type: 'varchar', length: 300 })
    localizacao: string

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'clienteId' })
    cliente: Cliente

}
