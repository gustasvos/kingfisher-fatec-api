import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Evento } from './Evento';
import { User } from './usuario';

export enum StatusConvite {
  PENDENTE = 'PENDENTE',
  CONFIRMADO = 'CONFIRMADO',
  RECUSADO = 'RECUSADO'
}

@Entity('evento_convidado')
export class EventoConvidado {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Evento, (evento) => evento.convidados, { onDelete: 'CASCADE' })
  evento: Evento

  @ManyToOne(() => User, (usuario) => usuario.eventosConvidado, { eager: true })
  funcionario: User

  @Column({ type: 'enum', enum: StatusConvite, default: StatusConvite.PENDENTE })
  status: StatusConvite

  @Column({ type: 'varchar', length: 1024, nullable: true })
  motivo?: string | null

  @CreateDateColumn()
  criadoEm: Date
}
