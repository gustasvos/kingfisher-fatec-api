import { IsDate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 14  })
    CNPJ: string

    @Column({ type: 'varchar', length: 255 })
    nomeFantasia: string

    @IsDate()
    @Column({ type: 'date', default: '2000-01-01' })
    prazoFaturamento: Date

    @Column({ type: 'varchar', length: 255  })
    contatoResponsavel: string

    @Column({ type: 'varchar', length: 255 })
    emailResponsavel: string

    @Column({ type: 'varchar', length: 10 })
    CNAE: string

    @Column({ type: 'varchar', length: 255 })
    descricaoCNAE: string

    @Column({ type: 'int' })
    colaboradorId: number
}