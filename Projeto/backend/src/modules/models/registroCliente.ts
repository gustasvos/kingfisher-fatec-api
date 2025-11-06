import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Cliente } from './cliente'

@Entity('registro_cliente')
export class RegistroCliente {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cliente_id: number

    @Column({ type: 'date' })
    data_registro: Date

    @Column({ type: 'varchar', length: 500 })
    observacao: string

    // FK 
    @ManyToOne(() => Cliente, (cliente) => cliente.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente
}


/*
Buscar a categoria com left join

const registros = await dataSource
    .getRepository(RegistroCliente)
    .createQueryBuilder('registro')
    .leftJoinAndSelect('registro.cliente', 'cliente')
    .select([
        'registro.id',
        'registro.data_registro',
        'registro.observacao',
        'cliente.id',
        'cliente.Categoria', // pega só os campos desejados do cliente
    ])
    .getMany()

Ou

const registro = await registroClienteRepository.findOne({
  where: { id: 1 },
  relations: ['cliente'],
})

console.log(registro.cliente.Categoria)

*/