import { IsDate, isDate } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from "typeorm";
import { CategoriaFunil } from "../../utils/enums/categoriaFunil";
import { User } from "./usuario";

@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 14  })
    CNPJ: string

    @Column({ type: 'varchar', length: 255 })
    NomeFantasia: string

    @IsDate()
    @Column({ type: 'date', default: '2000-01-01' })
    PrazoFaturamento: Date

    @Column({ type: 'varchar', length: 255  })
    ContatoResponsavel: string

    @Column({ type: 'varchar', length: 255 })
    EmailResponsavel: string

    @Column({ type: 'varchar', length: 10 })
    CNAE: string

    @Column({ type: 'varchar', length: 255 })
    descricaoCNAE: string


    @Column({ name: 'colaborador_id', type: 'int' })
    colaborador_id: number
}