<script setup lang="ts">
import { getMenuList, getMenuTree } from '@/api/user/menu'
import type { IPage } from '@/types'
import { StatusCode } from '@/types'
import type { MenuVO, SelectMenuListDTO } from '@/types/user/menu'
import { MenuTypeObj } from '@/types/user/menu'
import { useDateFormat, useLocalStorage } from '@vueuse/core'
const pageNo = ref(1)
const pageSize = ref(10)
const menuListTree = ref<MenuVO[]>([])
// 表格数据
const pageInfo = ref<IPage<MenuVO>>({
  records: [],
  total: 0,
  pages: 0,
  size: 0,
  current: 0,
})
// 表格ref
const roleTableRef = ref()
// 最新修改时间
const updateTime = ref<string>('')
const route = useRoute()
// 表格显示
const toggleTableTree = useLocalStorage(`${route.path}toggleTableTree`, false)
// 查询参数
const isShowSearch = ref<boolean>(true)
// Loading
const isLoading = ref<boolean>(false)
// 搜索条件
const searchDTO = ref<SelectMenuListDTO>({
  code: undefined,
  keyword: undefined,
  parentId: undefined,
  roleId: undefined,
  timeSort: undefined,
})

/**
 *  加载数据
 * @param type 加载类型 列表还是树形
 */
async function loadData(type: 'page' | 'tree' = 'page') {
  if (isLoading.value) return

  if (menuListTree.value.length) isLoading.value = true

  if (type === 'page') {
    const { data } = await getMenuTree()
    if (data.code === StatusCode.SUCCESS) {
      menuListTree.value = data.data
      console.log('menuListTree', menuListTree.value)
    }
    // } else if (type === 'tree') {
    //   const { data } = await getRoleTree()
    //   if (data.code === StatusCode.SUCCESS) {
    //     pageInfo.value.records = data.data as RoleTreeVO[]
    //   }
  }
  updateTime.value = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}
// 监听搜索条件和分页数据的变化
watch([searchDTO, pageNo, pageSize], () => {
  loadData()
})

/**
 *  监听树形表格的展开收起
 */
watch(
  toggleTableTree,
  (val) => {
    loadData(val ? 'tree' : 'page')
  },
  { immediate: true },
)

const isEdit = ref(false)
</script>
<template>
  <div class="~ cols-1 gap-6 grid">
    <h3>
      <i :class="$route?.meta?.onIcon" mr-2 p-0.6em></i>
      菜单管理
      <small v-show="updateTime" text-0.8rem font-500 opacity-60>（最后更新：{{ updateTime }}）</small>
    </h3>
    <el-scrollbar view-class="flex items-center"> </el-scrollbar>
    <!-- 菜单表格 -->
    <el-table
      ref="roleTableRef"
      v-loading="isLoading"
      class-name="w-full table-default"
      :data="menuListTree"
      stripe
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      empty-text="暂无数据"
      :header-cell-style="{
        padding: '1rem 0',
        fontSize: '1em',
      }"
      row-class-name="group h-5.5rem"
      row-key="id"
      height="72vh">
      <!-- 选择 -->
      <el-table-column fixed type="selection" />
      <!-- 菜单ID -->
      <el-table-column label="菜单ID" property="id" min-width="200%" column-key="id">
        <template #default="{ row }">
          <span
            v-copying.toast="row?.id"
            block
            truncate
            class="w-10rem cursor-pointer truncate transition-200 hover:(text-[var(--el-color-info)] underline)"
            >{{ row?.id }}</span
          >
        </template>
      </el-table-column>
      <!-- 控件名称 -->
      <el-table-column column-key="name" prop="name" label="控件名称" min-width="160%">
        <template #default="{ row }">
          <CopyText :text="row?.name" :show-icon="false" text-0.8rem />
        </template>
      </el-table-column>
      <!-- 菜单码 -->
      <el-table-column label="菜单码CODE" column-key="code" prop="code" min-width="180%">
        <template #default="{ row }">
          <el-tag type="info" truncate>
            <CopyText :text="row?.code" :show-icon="false" text-0.8rem />
          </el-tag>
        </template>
      </el-table-column>
      <!-- 链接 -->
      <el-table-column label="链接" column-key="linkUrl" prop="linkUrl" min-width="180%">
        <template #default="{ row }">
          <CopyText truncate :text="row?.linkUrl" :show-icon="false" text-0.8rem />
        </template>
      </el-table-column>
      <!-- 节点类型 -->
      <el-table-column column-key="type" prop="type" label="节点类型" align="center" min-width="140%">
        <template #default="{ row }">
          <el-tag effect="dark">
            {{ Object.values(MenuTypeObj).find((p) => p.value === row?.type)?.label || '菜单' }}
          </el-tag>
        </template>
      </el-table-column>
      <!-- 权重 -->
      <el-table-column column-key="sortOrder" prop="sortOrder" label="权重" min-width="100%" align="right" />
      <!-- 父菜单ID -->
      <el-table-column column-key="parentId" prop="parentId" label="父菜单ID" min-width="180%" class="truncate" />
      <!-- 更新时间 -->
      <el-table-column column-key="updateTime" prop="updateTime" label="更新时间" sortable width="180%" />
      <!-- 创建时间 -->
      <el-table-column column-key="createTime" prop="createTime" label="创建时间" sortable min-width="180%" />
      <!-- 动作+弹窗 -->
    </el-table>
    <!-- 分页器 -->
    <footer flex-row-bt-c>
      <small>
        共<strong class="text-1rem text-[var(--el-color-primary)]">{{ menuListTree.length }}</strong
        >菜单
      </small>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.content {
  --at-apply: 'v-card border-default bg-white dark:bg-dark-5 rounded-3 overflow-hidden ';
}

:deep(.el-dialog__body) {
  padding-top: 10px;
  padding-bottom: 10px;
  .el-select__popper {
    max-width: 100%;
    width: 100%;

    .el-select-dropdown__item.selected {
      background-color: var(--el-color-primary);
      color: #fff;
    }
  }
}

:deep(.el-table) {
  .el-table__cell .cell {
    display: flex;
  }
}
.top-menu {
  :deep(.scrollbar__bar) {
    display: none;
    width: 0;
    opacity: 0;
    .el-scrollbar__thumb {
      display: none;
      width: 0;
      opacity: 0;
    }
  }
  :deep(.el-checkbox) {
    margin: 0;
    .el-checkbox__input {
      display: none;
    }
  }
}
</style>
