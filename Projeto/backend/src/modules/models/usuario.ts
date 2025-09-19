import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('usuario')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    nome: string

    @Column({type: 'varchar', length: 11, unique: true})
    cpf: string

    @Column({ type: 'varchar', length: 255, unique: true})
    email: string

    @Column({ type: 'varchar', length: 15})
    telefone: string

    @Column({ type: 'varchar', length: 100})
    cargo: string

    @Column({ type: 'varchar', length: 255})
    senha: string

    @Column({type: 'date'})
    data_contratacao: Date
}