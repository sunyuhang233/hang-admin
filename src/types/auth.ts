import type { Gender, UserStatus } from "."

export interface UserInfoVO {
  id: string
  username: string
  email: string
  phone: string
  nickname: string
  gender: Gender
  avatar: string
  birthday: string
  slogan: string
  createTime: string
  updateTime: string
  lastLoginTime: string
  status: UserStatus
}
