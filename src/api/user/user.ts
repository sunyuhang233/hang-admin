import type { InsertAdminUserDTO, SelectUserInfoPageDTO, UpdateUserDTO, UserVO } from '@/types/user/user'
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
export function changeUserStatus(type: number, userId: number) {
  return useHttp.post<Result<null>>(`/user-service/admin/user/changeStatus?type=${type}&userId=${userId}`)
}

/**
 * 查询单个用户
 * @param userId 用户id
 * @returns
 */
export function getUserById(userId: number) {
  return useHttp.post<Result<UserVO>>(`/user-service/admin/user/get/${userId}`)
}

/**
 *  新增后台用户
 * @param user 新增用户vo
 * @returns
 */
export function insertUser(user: InsertAdminUserDTO) {
  return useHttp.post<Result<null>>(`/user-service/admin/user/insert`, user)
}

/**
 *  修改用户
 * @param userId userId
 * @param dto 修改用户vo
 * @returns
 */
export function updateUserInfo(userId: number, dto: UpdateUserDTO) {
  return useHttp.put<Result<null>>(`/user-service/admin/user/update/${userId}`, {
    ...dto,
  })
}

/**
 *  批量删除用户
 * @param userIds 用户ids
 * @returns
 */
export function deleteUser(userIds: number[]) {
  return useHttp.delete<Result<null>>(`/user-service/admin/user/delBatch`, {
    data: userIds,
  })
}
