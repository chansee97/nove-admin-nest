import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Permission } from 'src/modules/permission/entities/permission.entity'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string

  @Column({
    length: 20,
  })
  name: string

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'role_permission_relation',
  })
  permissions: Permission[]
}
