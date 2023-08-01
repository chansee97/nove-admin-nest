import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { encryptData } from 'src/utils/crypto'

@Entity('user')
export class User {
  /*
  @PrimaryGeneratedColumn('uuid')可配置为UUID为主键
   */
  @PrimaryGeneratedColumn()
  id: number // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string // 用户名

  @Column()
  password: string // 密码

  @Column({ nullable: true })
  nickname: string // 昵称

  avatar: string // 头像
  @Column({ nullable: true })
  email: string // 邮箱

  @Column({ nullable: true })
  role: string // 角色

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date

  @BeforeInsert()
  beforeInsert() {
    this.password = encryptData(this.password)
  }
}
