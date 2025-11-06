import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { CategoriaFunil } from '../../utils/enums/categoriaFunil'
import { Cliente } from './cliente'

@Entity('agendamento_cliente')
export class AgendamentoCliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cliente_id: number

    @Column({ type: 'varchar', length: 50 })
    titulo: string

    @Column({ type: 'datetime' })
    data_agendamento: Date

    @Column({ type: 'varchar', length: 500})
    descricao?: string

    @Column({ type: 'varchar', length: 300 })
    localizacao: string

    @ManyToOne(() => Cliente, (cliente) => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente

}
