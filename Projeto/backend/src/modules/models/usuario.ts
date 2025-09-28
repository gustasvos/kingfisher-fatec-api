import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { IsDate } from 'class-validator'
import { Sexo, EstadoCivil, TipoEndereco, TipoAcesso } from '../../utils/enums/usuarioEnums'
import { OneToMany } from 'typeorm'
import { EventoConvidado } from './EventoConvidado'

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    nome: string

    @Column({type: 'varchar', length: 255})
    nome_fantasia: string

    @Column({type: 'varchar', length: 11, unique: true})
    cpf: string

    @Column({type: 'enum', enum: Sexo})
    sexo: Sexo

    @Column({type: 'enum', enum: EstadoCivil})
    estado_civil: EstadoCivil

    @IsDate()
    @Column({type: 'date'})
    data_nascimento: Date

    @Column({ type: 'varchar', length: 100})
    cidade_nascimento: string

    @Column({ type: 'varchar', length: 10, unique: true})
    rg: string

    @Column({ type: 'varchar', length: 100})
    cidade_expedicao_rg: string

    @Column({ type: 'varchar', length: 10})
    orgao_expedidor: string

    @IsDate()
    @Column({ type: 'date', nullable: true })
    data_emissao_rg: Date


    @Column({type: 'varchar', length: 255})
    documento_exterior: string

    @Column({type: 'varchar', length: 14})
    inscricao_estadual: string

    @Column({type: 'varchar', length: 11})
    pis_pasep: string

    @Column({ type: 'varchar', length: 30, unique: true})
    rntrc: string

    @IsDate()
    @Column({type: 'date'})
    validade_rntrc: Date

    @Column({ type: 'varchar', length: 255, unique: true})
    email: string

    @Column({ type: 'varchar', length: 20})
    telefone: string

    @Column({ type: 'varchar', length: 20})
    celular: string
    
    @Column({ type: 'varchar', length: 20})
    operadora: string

    @Column({ type: 'varchar', length: 50})
    codigo: string

    @Column({ type: 'varchar', length: 255})
    nome_pai: string

    @Column({ type: 'varchar', length: 255})
    nome_mae: string

    @Column({ type: 'boolean', default: true})
    ativo: boolean

    @Column({ type: 'varchar', length: 8})
    cep: string

    @Column({ type: 'varchar', length: 100})
    bairro: string

    @Column({ type: 'varchar', length: 255})
    logradouro: string

    @Column({ type: 'varchar', length: 10})
    numero: string

    @Column({ type: 'varchar', length: 255, nullable: true})
    complemento: string

    @Column({ type: 'varchar', length: 100})
    cidade: string

    @Column({ type: 'enum', enum: TipoEndereco})
    tipo_endereco: TipoEndereco

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true})
    latitude: number
    
    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
    longitude: number

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