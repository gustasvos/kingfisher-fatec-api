import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { EventoConvidado } from './EventoConvidado';

@Entity('evento_resposta')
export class Evento_resposta{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    titulo_evento: string

    @Column({type: 'date'})
    data_evento: Date

    @Column({type: 'varchar', length: 255})
    objetivo: string

    @Column({type: 'varchar', length: 255})
    comentarios: string

    // relacionamentos

    // @ManyToOne(() => EventoConvidado, (evento) => evento    )

}