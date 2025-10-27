import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EventoConvidado } from './EventoConvidado';
import { EventoResposta } from './eventoResposta';

@Entity('evento')
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 1023 })
  descricao: string;

  @Column({ type: 'timestamp' })
  dataHora: Date;

  @Column({ type: 'varchar', length: 255 })
  localizacao: string;

  @OneToMany(() => EventoConvidado, ec => ec.evento, { cascade: true })
  convidados: EventoConvidado[];

  @OneToMany(() => EventoResposta, er => er.evento)
  respostas: EventoResposta[];
}
