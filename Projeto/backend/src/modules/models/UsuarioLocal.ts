import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './usuario'
import { LocalTrabalho } from '../../utils/enums/usuarioLocalEnums'

@Entity('usuario_local')
export class UsuarioLocal {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'enum', enum: LocalTrabalho })
  local: LocalTrabalho

  @ManyToOne(() => User, user => user.locais, { onDelete: 'CASCADE' })
  usuario: User
}
