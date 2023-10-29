import type { IPage, Result } from '@/types'
import { useHttp } from '..'
import type { RoleTreeVO, RoleVO, SelectPageRoleDTO } from '@/types/user/role'

/**
 *  获取角色树形菜单
 * @returns Result
 */
export function getRoleTree() {
  return useHttp.get<Result<RoleTreeVO[]>>('/user-service/admin/role/tree')
}

/**
 *  获取角色列标配
 * @returns Result
 */
export function getRoleList(pageNo: number, pageSize: number, dto: SelectPageRoleDTO) {
  return useHttp.post<Result<IPage<RoleVO>>>('/user-service/admin/role/list', dto)
}

/**
 *  获取当前用户的角色
 * @returns Result
 */
export function getRoleTreeByUserId(userId: number) {
  return useHttp.get<Result<RoleTreeVO[]>>(`/user-service/admin/role/getRoleByUserId/${userId}`)
}

/**
 *  用户分配角色
 * @param userId 用户id
 * @param roleIds 角色ids
 * @returns Result
 */
export function BindUserRole(userId: number, roleIds: number[]) {
  return useHttp.post<Result<null>>(`/user-service/admin/role/distribution/role/${userId}`, roleIds)
}
