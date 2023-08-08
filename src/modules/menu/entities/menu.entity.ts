import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number

  // 菜单名称
  @Column({
    length: 20,
  })
  menuName: string

  // 排序
  @Column()
  order: number

  // 父id
  @Column({ nullable: true })
  parentId: number

  // 菜单图标
  @Column({
    length: 50,
    nullable: true,
  })
  icon: string

  // 组件路径
  @Column({
    length: 50,
  })
  component: string

  // 路由
  @Column({
    length: 50,
  })
  path: string

  @CreateDateColumn()
  createTime: Date

  @UpdateDateColumn()
  updateTime: Date
}
