export class CreateMenuDto {
  /**
     * 组件路径
     */
  component: string
  /**
     * 菜单名称
     */
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
  path: string
}
