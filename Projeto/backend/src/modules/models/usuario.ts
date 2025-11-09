import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsDate } from 'class-validator'
import { Genero, TipoAcesso } from '../../utils/enums/usuarioEnums'
import { OneToMany } from 'typeorm'
import { EventoConvidado } from './EventoConvidado'
import { UsuarioLocal } from './UsuarioLocal'
import { EventoResposta } from './eventoResposta'

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string

    @Column({ type: 'enum', enum: Genero })
    genero: Genero

    @IsDate()
    @Column({ type: 'date' })
    dataNascimento: Date

    @Column({ type: 'varchar', length: 100 })
    cargo: string

    @Column({ type: 'text' })
    senha: string

    @IsDate()
    @Column({ type: 'date' })
    dataContratacao: Date

    @Column({ type: 'varchar', length: 30 })
    setor: string

    @Column({ type: 'enum', enum: TipoAcesso, default: 'usuario' })
    role: TipoAcesso

    // Relacionamentos
    @OneToMany(() => EventoConvidado, ec => ec.funcionario)
    eventosConvidado: EventoConvidado[];

    @OneToMany(() => UsuarioLocal, ul => ul.usuario)
    locais: UsuarioLocal[]

    @OneToMany(() => EventoResposta, er => er.usuario)
    respostasEvento: EventoResposta[];

}