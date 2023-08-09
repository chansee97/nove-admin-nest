import { IsNotEmpty } from 'class-validator'

export class CreateMenuDto {
  /**
     * 组件路径
     */
  @IsNotEmpty({ message: '组件路径不可为空' })
  component: string

  /**
     * 菜单名称
     */
  @IsNotEmpty({ message: '菜单名不可为空' })
  menuName: string

  /**
     * 顺序
     */
  order: number
  /**
     * 父节点ID
     */
  parentId: number
  /**
     * 路由地址
     */
  @IsNotEmpty({ message: '路由不可为空' })
  path: string
}
