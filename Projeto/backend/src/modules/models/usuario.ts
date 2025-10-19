import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsDate } from 'class-validator'
import { Genero, TipoAcesso } from '../../utils/enums/usuarioEnums'
import { OneToMany } from 'typeorm'
import { EventoConvidado } from './EventoConvidado'

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    nome: string

    @Column({type: 'varchar', length: 11, unique: true})
    cpf: string

    @Column({type: 'enum', enum: Genero})
    genero: Genero

    @IsDate()
    @Column({type: 'date'})
    data_nascimento: Date

    @Column({ type: 'varchar', length: 100})
    cargo: string

    @Column({ type: 'varchar', length: 255})
    senha: string

    @IsDate()
    @Column({type: 'date'})
    data_contratacao: Date

    @Column({ type: 'enum', enum: TipoAcesso, default: 'usuario' })
    role: TipoAcesso

    // Relacionamentos
    @OneToMany(() => EventoConvidado, ec => ec.funcionario)
    eventosConvidado: EventoConvidado[];
}