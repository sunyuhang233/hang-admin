import type { InsertMenuDTO, MenuVO, SelectMenuListDTO, UpdateMenuDTO } from '@/types/user/menu'
import { useHttp } from '..'
import type { IPage, Result } from '@/types'

/**
 *  获取菜单树形菜单
 * @returns Result
 */
export function getMenuTree() {
  return useHttp.get<Result<MenuVO[]>>('/user-service/admin/menu/tree')
}

/**
 * 获取菜单列表（列表）
 * @param dto 查询参数
 * @param token token
 * @returns Menu列表
 */
export function getMenuList(dto: SelectMenuListDTO) {
  return useHttp.get<Result<MenuVO[]>>(`/user-service/admin/menu/list/tree`)
}

/**
 * 添加菜单
 * @param dto 参数{}
 * @param token token
 * @returns 新增菜单列表
 */
export function insertMenu(dto: InsertMenuDTO) {
  return useHttp.post<Result<number>>('/user-service/admin/menu/save', {
    ...dto,
  })
}

/**
 * 更新菜单
 * @param id 菜单id
 * @param dto 更新参数{}
 * @param token token
 * @returns 新增菜单列表
 */
export function updateMenu(menuId: number, dto: UpdateMenuDTO) {
  return useHttp.put<Result<number>>(`/user-service/admin/menu/update/${menuId}`, {
    ...dto,
  })
}
/**
 * 删除菜单(批量)
 * @param ids 菜单ids
 * @returns Result
 */
export function batchDeleteMenu(menuIds: number[]) {
  return useHttp.delete<Result<null>>('/user-service/admin/menu/delete', {
    data: {
      menuIds,
    },
  })
}

/**
 * 删除菜单(单个)
 * @param id 菜单id
 * @returns Result
 */
export function batchDeleteMenuByMenuId(menuId: number) {
  return useHttp.delete<Result<null>>(`/user-service/admin/menu/delete/${menuId}`)
}
