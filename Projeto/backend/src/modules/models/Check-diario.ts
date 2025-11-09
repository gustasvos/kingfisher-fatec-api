import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("checklistDiario") export class ChecklistDiario {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({ nullable: true })
    placaVeiculo: string

    @Column("int", { nullable: true })
    kmInicial: number

    @Column({ nullable: true })
    cidadeDestino: string

    @Column("int", { nullable: true })
    kmFinal: number

    @Column({ type: 'boolean', nullable: true })
    abastecimento: boolean

    @Column({ type: 'boolean', nullable: true })
    comprovanteEnviado: boolean

    @Column({ type: 'boolean', nullable: true })
    oleoMotor: boolean

    @Column({ type: 'boolean', nullable: true })
    reservatorioAgua: boolean

    @Column({ type: 'boolean', nullable: true })
    sistemaEletrico: boolean

    @Column({ type: 'boolean', nullable: true })
    estadoPneus: boolean

    @Column({ type: 'boolean', nullable: true })
    limpeza: boolean

    @Column({ type: 'boolean', nullable: true })
    macaco: boolean

    @Column({ type: 'boolean', nullable: true })
    chaveRoda: boolean

    @Column({ type: 'boolean', nullable: true })
    documentoVigente: boolean

    @Column("timestamp")
    dataHoraEncerramento: Date

    @Column({ type: "text", nullable: true })
    observacoes: string

}