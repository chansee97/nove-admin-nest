import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
