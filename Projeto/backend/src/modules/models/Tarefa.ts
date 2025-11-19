import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './cliente';
import { User } from './usuario';
 
export enum StatusTarefa {
    PENDENTE = 'pendente',
    CONCLUIDA = 'concluida',
    CANCELADA = 'cancelada',
}
 
export enum TipoTarefa {
    LIGACAO = 'ligacao',
    EMAIL = 'email',
    VISITA = 'visita',
    REUNIAO = 'reuniao',
    OUTRO = 'outro',
}
 
@Entity('tarefas')
export class Tarefa {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column({ type: 'varchar', length: 255 })
    titulo: string;
 
    @Column({ type: 'date' })
    data: Date;
 
    @Column({
        type: 'enum',
        enum: StatusTarefa,
        default: StatusTarefa.PENDENTE,
    })
    status: StatusTarefa;
 
    @Column({
        type: 'enum',
        enum: TipoTarefa,
    })
    tipo: TipoTarefa;
 
    @Column({ type: 'text', nullable: true })
    descricao: string;
 
    @ManyToOne(() => Cliente, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;
 
    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vendedor_id' })
    vendedor: User;
  }