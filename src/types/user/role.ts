export interface RoleTreeVO extends RoleVO {
  children: RoleTreeVO[]
}

/**
 * RoleVO
 */
export interface RoleVO {
  /**
   * 权限ID
   */
  id: string
  /**
   * 权限唯一CODE代码
   */
  code: string
  /**
   * 权限名称
   */
  name: string
  /**
   * 权限介绍
   */
  intro?: string
  /**
   * 创建人
   */
  creator: string
  /**
   * 父id
   */
  parentId?: string

  updateTime: string
  createTime: string
}
