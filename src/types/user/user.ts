import type { Gender } from '../common'

export interface SelectUserInfoPageDTO {
  /**
   * 创建时间排序
   * 0asc, 1desc
   */
  createTimeSort?: number
  /**
   * 是否只看客户
   * 0否 1是
   */
  isCustomer?: number
  /**
   * 用户名、昵称、手机号、邮箱
   */
  keyWord?: string
  /**
   * 是否禁用
   * 0否 1是
   */
  status?: number
}
export interface UserVO {
  /**
   * id
   */
  id?: string
  /**
   * 头像icon
   */
  avatar?: string
  /**
   * 生日
   */
  birthday?: string
  /**
   * 账号创建时间
   */
  createTime?: string
  /**
   * 邮箱
   */
  email?: string
  /**
   * 性别 （男|女|保密）
   */
  gender?: Gender
  /**
   * 最后登录时间
   */
  lastLoginTime?: string
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 手机号
   */
  phone?: string
  /**
   * 登录状态
   */
  status?: number
  /**
   * 更新时间
   */
  updateTime?: string
  /**
   * 用户名
   */
  username?: string
}
export interface InsertAdminUserDTO {
  /**
   * 头像
   */
  avatar?: string
  /**
   * 生日
   */
  birthday?: string
  /**
   * 性别（男|女|保密）
   */
  gender?: Gender | string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 密码
   */
  password: string
  /**
   * 状态（0|1）
   */
  status?: number
  /**
   * 用户名|员工号
   */
  username: string
}
