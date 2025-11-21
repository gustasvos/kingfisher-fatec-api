import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Cliente } from "./cliente"

@Entity('cotacao')
export class Cotacao {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'int' })
    id_cliente: number

    @ManyToOne(() => Cliente, cliente => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    data_criacao: Date

    @Column({ type: 'date' })
    data_validade: Date

    @Column({ type: 'varchar', length: 50 })
    status: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    valor_total: number

    @Column({ type: 'text', nullable: true })
    detalhes_frete: string

    @Column({ type: 'text', nullable: true })
    motivo_recusa: string

    @Column({ type: 'varchar', length: 255, nullable: true, default: "" })
    caminho_arquivo_pdf?: string

    @Column({ type: 'text', nullable: true })
    observacoes_internas: string

    @Column({ type: 'text', nullable: true })
    detalhes_internas: string
}
