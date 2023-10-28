import type { SelectUserInfoPageDTO, UserVO } from '@/types/user/user'
import { useHttp } from '..'
import type { IPage, Result } from '@/types'

/**
 *  分页查询加搜索条件搜索
 * @param pageNo 当前页
 * @param pageSize 每页条数
 * @param dto 查询条件
 * @returns
 */
export function getUserPage(pageNo: number, pageSize: number, dto: SelectUserInfoPageDTO) {
  return useHttp.post<Result<IPage<UserVO>>>(`/user-service/admin/user/page/${pageNo}/${pageSize}`, dto)
}

/**
 * 切换用户状态
 * @param changeUserStatusDTO 用户切换实体
 * @returns
 */
export function changeUserStatus(changeUserStatusDTO: { type: number; userId: number }) {
  return useHttp.post<Result<null>>('/user-service/admin/user/changeStatus', changeUserStatusDTO)
}
