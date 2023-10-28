import type { Result } from '@/types'
import { useHttp } from '.'

interface LoginUserVo {
  username: string
  password: string
}

export function userLogin(loginUserVo: LoginUserVo) {
  return useHttp.post<
    Result<{
      token: string
    }>
  >('/user-service/admin/user/login', loginUserVo)
}
