import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evento } from './Evento';
import { User } from './usuario';

@Entity('eventoResposta')
export class EventoResposta{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', length: 255})
    tituloEvento: string

    @Column({type: 'date'})
    dataEvento: Date

    @Column({type: 'varchar', length: 255})
    objetivo: string

    @Column({type: 'int'})
    avaliacao: number

    @Column({type: 'varchar', length: 255})
    comentarios: string

    @ManyToOne(() => Evento, { onDelete: 'CASCADE' })
    evento: Evento

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    usuario: User

}
