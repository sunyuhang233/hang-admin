export interface IPage<T> {
  records: T
  total: number
  size: number
  current: number
  orders?: []
  optimizeCountSql?: boolean
  searchCount?: boolean
  pages: number
}

export interface Result<T> {
  [x: string]: any
  code: StatusCode
  msg: string
  data: T
}

export enum StatusCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
}
// 性别
export enum Gender {
  MALE = '男',
  FEMALE = '女',
  UNKNOWN = '保密',
}

// 状态
export enum UserStatus {
  ENABLE = '启用',
  UNABLE = '禁用',
}
