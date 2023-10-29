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
  id: number
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
  creator: number
  /**
   * 父id
   */
  parentId?: number

  updateTime: string
  createTime: string
}
export interface SelectPageRoleDTO {
  /**
   * 角色码
   */
  code?: string
  /**
   * 角色ID
   */
  id?: number
  /**
   * 角色名称
   */
  name?: string
  /**
   * 父角色ID
   */
  parentId?: number
  /**
   * 时间排序
   * 0 asc, 1 desc
   */
  timeSort?: number
  [property: string]: any
}

export interface InsertRoleDTO {
  /**
   * 角色唯一Code
   */
  code: string
  /**
   * 角色备注
   */
  intro: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色ID
   */
  parentId?: number
  /**
   * 角色ID
   */
  permissionList?: string[]
}

/**
 * 更新DTO
 */
export type UpdateRoleDTO = Omit<InsertRoleDTO, 'code'>
