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
    @Column({ type: 'datetime'  })
    PrazoFaturamento: Date

    @Column({ type: 'varchar', length: 255  })
    ContatoResponsavel: string

    @Column({ type: 'varchar', length: 255 })
    EmailResponsavel: string

    @Column({ type: 'varchar', length: 7 })
    CNAE: string

    @Column({ type: 'varchar', length: 255 })
    descricao_CNAE: string

    @Column({ type: 'enum', enum: CategoriaFunil, default: CategoriaFunil.PROSPECT})
    Categoria: CategoriaFunil

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn({ name: 'colaborador_id'})
    colaborador: User
}