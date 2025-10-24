import { IsDate, isDate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity('evento')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 14  })
    CNPJ: string

    @Column({ type: 'varchar', length: 255 })
    NomeFantasia: string

    @IsDate()
    @Column({ type: 'datetime'  })
    PrazoFaturamento: Date

    @Column({ type: 'varchar', length: 255  })
    ContatoResponsavel: string

    @Column({ type: 'varchar', length: 255 })
    EmailResponsavel: string
}