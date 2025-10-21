import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { EventoConvidado } from './EventoConvidado';
import { Evento } from './Evento';
import { User } from './usuario';

@Entity('evento_resposta')
export class EventoResposta{
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

    @ManyToOne(() => Evento, { onDelete: 'CASCADE' })
    evento: Evento

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    usuario: User

}