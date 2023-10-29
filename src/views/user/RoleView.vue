<script setup lang="ts">
import { getRoleList, getRoleTree } from '@/api/user/role'
import { useUserStore } from '@/stores/user'
import type { IPage } from '@/types'
import { StatusCode } from '@/types'
import type { RoleTreeVO, RoleVO, SelectPageRoleDTO } from '@/types/user/role'
import { useDateFormat, useLocalStorage } from '@vueuse/core'

const store = useUserStore()
const pageNo = ref(1)
const pageSize = ref(10)
const pageInfo = ref<IPage<RoleTreeVO>>({
  records: [],
  total: 0,
  pages: 0,
  size: 0,
  current: 0,
})
const roleTableRef = ref()
const updateTime = ref<string>('')
const route = useRoute()
// 表格显示
const toggleTableTree = useLocalStorage(`${route.path}toggleTableTree`, false)
// 查询参数
const isShowSearch = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const searchDTO = ref<SelectPageRoleDTO>({
  code: undefined,
  name: undefined,
  creator: undefined,
  parentId: undefined,
  roleId: undefined,
  timeSort: undefined,
})

async function loadData(type: 'page' | 'tree' = 'tree') {
  if (isLoading.value) return

  if (pageInfo.value.records.length) isLoading.value = true

  if (type === 'page') {
    const { data } = await getRoleList(pageNo.value, pageSize.value, searchDTO.value)
    if (data.code === StatusCode.SUCCESS) {
      pageInfo.value = data.data as IPage<RoleTreeVO>
    }
  } else if (type === 'tree') {
    const { data } = await getRoleTree()
    if (data.code === StatusCode.SUCCESS) {
      pageInfo.value.records = data.data as RoleTreeVO[]
    }
  }
  updateTime.value = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value
  setTimeout(() => {
    isLoading.value = false
  }, 500)
}

watch([searchDTO, pageNo, pageSize], () => {
  loadData()
})

function resetSearchData() {
  pageNo.value = 1
  searchDTO.value = {
    code: undefined,
    name: undefined,
    creator: undefined,
    parentId: undefined,
    roleId: undefined,
    timeSort: undefined,
  }
  loadData(toggleTableTree.value ? 'tree' : 'page')
}

watch(
  toggleTableTree,
  (val) => {
    loadData(val ? 'tree' : 'page')
  },
  { immediate: true },
)

const selectList = ref<RoleVO[]>([])
const isEdit = ref(false)

function openExportExcel() {}

function onSubmit(type: string, data: any) {}

function onShowDetail(one: any, call?: Function) {}
</script>
<template>
  <div class="~ cols-1 gap-6 grid">
    <h3>
      <i :class="$route?.meta?.onIcon" mr-2 p-0.6em></i>
      角色管理
      <small v-show="updateTime" text-0.8rem font-500 opacity-60>（最后更新：{{ updateTime }}）</small>
    </h3>
    <el-scrollbar view-class="flex items-center">
      <header class="top-menu w-full flex-row-bt-c">
        <div
          mr-4
          flex=" ~ gap-2 md:gap-4 items-center"
          :class="!isShowSearch ? 'scale-x-90  opacity-0' : ' scale-x-100 opacity-100'"
          class="flex-shrink-0 transform-origin-left-center overflow-hidden transition-300 transition-all">
          <small flex-shrink-0 opacity-70>筛选:</small>
          <el-input
            v-model="searchDTO.name"
            placeholder="角色名 (Enter)"
            prefix-icon="Search"
            class="w-full"
            label="角色名"
            :disabled="isLoading"
            @keyup.enter="loadData" />
          <!-- 创建排序 -->
          <el-checkbox
            v-model="searchDTO.timeSort"
            border
            class="card-default"
            :true-label="1"
            :false-label="0"
            @change="loadData()">
            <i i-solar:sort-by-time-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.timeSort === undefined">时间排序</span>
            <span v-show="searchDTO.timeSort != undefined">{{ searchDTO.timeSort ? '时间降序' : '时间升序' }}</span>
          </el-checkbox>
          <el-button plain type="danger" @click="resetSearchData"> 重置 </el-button>
        </div>
        <div class="flex ml-a">
          <TableDefaultBtns
            :menu="[
            {
              show:true,
              title:'导出',
              methods:openExportExcel,
              icon:'i-solar:printer-outline',
              type:'default',
              plain:false
            }, {
                show: selectList.length > 0,
                title: '批量',
                methods: () => {
                  onSubmit('batchDel', selectList.map(p => +p.id) as number[] || [])
                },
                icon: 'i-solar:trash-bin-minimalistic-broken ',
                type: 'danger',
              },
              {
                show:true,
                title:isShowSearch ? '取消' : '筛选',
                methods:()=>isShowSearch = !isShowSearch,
                icon: 'i-solar:sort-from-top-to-bottom-line-duotone ', type: 'default'
              },{
                show:true,
                title:'刷新',
                methods:()=>loadData(),
                icon:'i-solar:refresh-outline',
                type:'info'
              },{
                show:true,
                title:'添加',
                methods:onShowDetail(undefined,()=>isEdit=true),
                 icon: 'i-solar:box-outline mr-2', type: 'info'
              }
          ]"></TableDefaultBtns>
        </div>
      </header>
    </el-scrollbar>
    <!-- 角色表格 -->
    <el-table
      ref="roleTableRef"
      v-loading="isLoading"
      class-name="w-full table-default"
      :data="pageInfo.records"
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
      <!-- 角色ID -->
      <el-table-column label="角色ID" property="id" sortable min-width="200%" column-key="id">
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
      <!-- 名称 -->
      <el-table-column column-key="name" prop="name" label="名称" min-width="140%">
        <template #default="{ row }">
          <CopyText :text="row?.name" :show-icon="false" text-0.9rem font-600 />
        </template>
      </el-table-column>
      <!-- 角色码 -->
      <el-table-column label="角色码CODE" column-key="code" prop="code" min-width="240%">
        <template #default="{ row }">
          <el-tag type="info" truncate>
            <CopyText :text="row?.code" :show-icon="false" text-0.8rem />
          </el-tag>
        </template>
      </el-table-column>
      <!-- 父角色ID -->
      <el-table-column column-key="parentId" prop="parentId" sortable label="父角色ID" min-width="200%" />
      <!-- 备注 -->
      <el-table-column column-key="intro" prop="intro" label="备注" min-width="160%" show-overflow-tooltip />
      <!-- 创建者 -->
      <el-table-column column-key="creator" prop="creator" label="创建者" min-width="200%" show-overflow-tooltip />
      <!-- 更新时间 -->
      <el-table-column column-key="updateTime" prop="updateTime" label="更新时间" sortable width="180%" />
      <!-- 创建时间 -->
      <el-table-column column-key="createTime" prop="createTime" label="创建时间" sortable min-width="180%" />
      <!-- 动作+弹窗 -->
      <el-table-column fixed="right" label="操作" min-width="200%">
        <template #header>
          <div class="flex-row-c-c">
            显示：
            <el-switch
              v-model="toggleTableTree"
              inactive-text="分页"
              active-text="树形"
              inline-prompt
              style="--el-switch-on-color: var(--el-color-info)" />
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex opacity-0 transition-200 group-hover:opacity-100">
            <!-- 预览 -->
            <div class="mx-2 btn-default hover:text-[var(--el-color-info)]" style="padding: 0rem 0.6rem">
              <i i-solar:eye-bold-duotone p-0.5em />
            </div>
            <!-- 编辑 -->
            <el-button icon="Edit" type="success" style="padding: 0rem 0.6rem" />
            <el-button type="danger" style="padding: 0rem 0.6rem" icon="delete" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <footer flex-row-bt-c>
      <el-pagination
        v-show="!toggleTableTree"
        v-model:current-page="pageNo"
        background
        layout="prev,pager,next"
        :page-count="pageInfo.pages" />
      <small class="ml-a">
        共<strong class="text-1rem text-[var(--el-color-primary)]">{{ pageInfo.total }}</strong
        >角色
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
