export interface MenuVO {
  /**
   * 菜单编码
   */
  code: string
  id: string
  sysType: SysType
  /**
   * 页面对应的地址
   */
  linkUrl: string
  /**
   * 名称
   */
  name: string
  /**
   * 排序号
   */
  sortOrder?: number
  /**
   * 父节点
   */
  parentId?: string
  /**
   * 节点类型：（1页面，2按钮）
   */
  type: MenuType
  updateTime: string
  createTime: string
  children?: MenuVO[]
}
/**
 * 菜单节点类别字典
 */
export enum MenuType {
  PAGE = 1,
  BTN = 2,
}
const menuTypeObj = {
  PAGE: {
    value: 1,
    label: '页面',
  },
  BTN: {
    value: 2,
    label: '按钮',
  },
}
export enum SysType {
  WEB_FRONT_PC = 0,
  WEB_BACK = 1,
}
const sysTypeObj = {
  WEB_FRONT_PC: {
    value: 0,
    label: 'Web_Pc 前台',
  },
  WEB_BACK: {
    value: 1,
    label: 'Web_Back 管理',
  },
}
/**
 * SelectMenuListDTO
 */
export interface SelectMenuListDTO {
  /**
   * 菜单码
   */
  code?: string
  /**
   * 关键字
   */
  keyword?: string
  /**
   * 父菜单ID
   */
  parentId?: string
  /**
   * 角色id
   */
  roleId?: string
  /**
   * 时间排序
   * 0 asc, 1 desc
   */
  timeSort?: number
  [property: string]: any
}
export interface InsertMenuDTO {
  code: string
  name: string
  parentId?: string
  linkUrl?: string
  sortOrder: number
  /**
   * 操作系统（0前台，1管理...）
   */
  sysType: number
  /**
   * 节点类型：（1页面，2按钮）
   */
  type: number
}

/**
 * UpdateMenuDTO
 */
export interface UpdateMenuDTO {
  /**
   * 菜单唯一CODE代码
   */
  code?: string
  /**
   * 菜单介绍
   */
  creator?: string
  /**
   * 菜单介绍
   */
  intro?: string
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 所属父级菜单ID
   */
  parentId?: string
  [property: string]: any
}
/**
 * 菜单列表VO
 *
 * MenuVO
 */
export interface MenuVO {
  /**
   * 菜单编码
   */
  code: string
  id: string
  sysType: SysType
  /**
   * 页面对应的地址
   */
  linkUrl: string
  /**
   * 名称
   */
  name: string
  /**
   * 排序号
   */
  sortOrder?: number
  /**
   * 父节点
   */
  parentId?: string
  /**
   * 节点类型：（1页面，2按钮）
   */
  type: MenuType
  updateTime: string
  createTime: string
  children?: MenuVO[]
}
export const MenuTypeObj = menuTypeObj


export const SysTypeObj = sysTypeObj