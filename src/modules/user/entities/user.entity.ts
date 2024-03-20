import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { encryptData } from 'src/utils/crypto'
import { Role } from '../../role/entities/role.entity'

@Entity('user')
export class User {
  /*
  @PrimaryGeneratedColumn('uuid')可配置为UUID为主键
   */
  @PrimaryGeneratedColumn() // 标记为主键，值自动生成
  id: number

  // 用户名
  @Column({ length: 30 })
  username: string

  // 密码
  @Column()
  password: string

  // 昵称
  @Column({ nullable: true })
  nickname: string

  // 头像
  @Column({ nullable: true })
  avatar: string

  // 邮箱
  @Column({ nullable: true })
  email: string

  // 手机号码
  @Column({ nullable: true })
  tel: string

  // 备注
  @Column({ nullable: true })
  notes: string

  // 角色
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
  })
  roles: Role[]

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date

  @BeforeInsert()
  beforeSave() {
    this.password = encryptData(this.password)
  }
}
