import type { IPage, Result } from '@/types'
import { useHttp } from '..'
import type { InsertRoleDTO, RoleTreeVO, RoleVO, SelectPageRoleDTO, UpdateRoleDTO } from '@/types/user/role'

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
  return useHttp.post<Result<IPage<RoleVO>>>(`/user-service/admin/role/list?pageNo=${pageNo}&pageSize=${pageSize}`, dto)
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

/**
 * 添加角色(单个)
 * @param dto 参数
 * @returns Result
 */
export function insertRole(dto: InsertRoleDTO) {
  return useHttp.post<Result<null>>('/user-service/admin/role/save', {
    ...dto,
  })
}

/**
 * 修改角色信息
 * @param roleId 角色id
 * @param dto 修改参数
 * @returns Result
 */
export function updateRole(roleId: number, dto: UpdateRoleDTO) {
  return useHttp.put<Result<null>>(`/user-service/admin/role/update/${roleId}`, {
    ...dto,
  })
}

/**
 * 删除角色(批量)
 * @param ids 删除数组
 * @returns Result
 */
export function batchDelRoleByIds(roleIds: string[]) {
  return useHttp.delete<Result<null>>('/user-service/admin/role/delete', {
    data: roleIds,
  })
}

/**
 * 删除角色(单个)
 * @param id 删除id
 * @returns Result
 */
export function batchDelRoleById(roleId: number) {
  return useHttp.delete<Result<null>>(`/user-service/admin/role/delete/${roleId}`)
}
