import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('motorista')
export class Motorista {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    nome: string

    @Column({ type: 'varchar', length: 11, unique: true })
    cpf: string

    @Column({ type: 'varchar', length: 20, unique: true })
    cnh: string

    @Column({ type: 'varchar', length: 2 })
    categoriaCnh: string

    @Column({ type: 'date' })
    validadeCnh: Date

    @Column({ type: 'varchar', length: 20, unique: true })
    telefone: string

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string

    @Column({ type: 'varchar', length: 255 })
    endereco: string

    @Column({ type: 'varchar', length: 10 })
    cep: string

    @Column({ type: 'varchar', length: 100 })
    cidade: string

    @Column({ type: 'varchar', length: 2 })
    estado: string

    @Column({ type: 'varchar', length: 255 })
    senha: string

    @Column({ type: 'date', nullable: true })
    dataNascimento: Date

    @Column({ type: 'boolean', default: true })
    ativo: boolean
}