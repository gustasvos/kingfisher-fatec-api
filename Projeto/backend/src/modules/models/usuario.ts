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

    @Column({ type: 'varchar', length: 50, default: 'usuario' })
    role: string
}
// cpf ok
// nome completo ok
// nome fantasia not ok
// sexo
// estado civil
// data nascimento
// cidade de nascimento
// RG
// Cidade exoedição RG
// Orgão expedidor
// Data emissão RG
// Documento Exterior
// inscrição estadual
// PIS/PASEP
// RNTRC
// validade RNTRC
// telefone ok
// celular
// Operadora
// email ok
// código
// Nome do pai
// Nome da mãe
// Ativo
// CEP
// Bairro
// Logradouro
// Número
// Complemento
// Cidade
// tipo de endereço
// latitude
// longitude