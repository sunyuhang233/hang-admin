import type { Result } from '@/types'
import { useHttp } from '.'

interface LoginUserVo {
  username: string
  password: string
}

/**
 * 用户登录
 * @param loginUserVo 登录用户账号密码
 * @returns token
 */
export function userLogin(loginUserVo: LoginUserVo) {
  return useHttp.post<
    Result<{
      token: string
    }>
  >('/user-service/admin/user/login', loginUserVo)
}

/**
 *  用户退出登录
 * @returns
 */
export function userExit() {
  return useHttp.post<Result<null>>('/user-service/admin/user/logout')
}
