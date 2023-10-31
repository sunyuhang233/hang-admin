<script setup lang="ts">
import { batchDeleteMenuByMenuId, getMenuList, getMenuTree, updateMenu } from '@/api/user/menu'
import type { IPage } from '@/types'
import { StatusCode } from '@/types'
import type { MenuVO, SelectMenuListDTO, UpdateMenuDTO } from '@/types/user/menu'
import { MenuTypeObj, SysTypeObj } from '@/types/user/menu'
import { compareObjects } from '@/utils'
import { exportExcel } from '@/utils/elsx'
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

// 计算表格的数量
const menuListTreeLength = computed(() => {
  let res = 0

  function deepArr(arr: MenuVO[]) {
    for (const item of arr) {
      res++
      if (item.children && item.children.length) {
        deepArr(item.children)
      }
    }
  }
  deepArr(menuListTree.value)
  return res
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

// 当前行
const theRowInfo = ref<MenuVO>()

// 选择的行
const selectList = ref<MenuVO[]>([])
function onSelectChange(val: MenuVO[]) {
  selectList.value = val ? val : []
}

// 表单参数
const form = ref<Partial<MenuVO>>({
  id: undefined,
  code: undefined,
  name: undefined,
  parentId: undefined,
  linkUrl: undefined,
  sortOrder: undefined,
  /**
   * 操作系统（0前台，1管理...）
   */
  sysType: undefined,
  /**
   * 节点类型：（1页面，2按钮）
   */
  type: undefined,
})

// 是否表单更新
const isUpdate = computed(() => {
  if (theRowInfo.value) return Object.keys(compareObjects(theRowInfo.value, form.value)).length > 0
  else return false
})

/**
 * 菜单操作
 * @param type 类型
 */
async function onSubmit(
  type: 'insert' | 'update' | 'delete' | 'batchDel',
  data: string | string[] | Partial<MenuVO>,
  rawData: MenuVO = theRowInfo.value!,
) {
  const tip = {
    class: 'el-button--primary',
    title: '操作',
  }
  if (type === 'insert') {
    tip.title = '添加菜单'
  } else if (type === 'delete') {
    tip.class = 'el-button--danger'
    tip.title = '删除该菜单'
  } else if (type === 'update') {
    tip.title = '保存更新'
  } else if (type === 'batchDel') {
    tip.title = '批量删除'
    tip.class = 'el-button--danger'
  } else {
    return
  }

  // 二步确认
  ElMessageBox.confirm(`是否确认${tip.title}？`, '操作提醒', {
    confirmButtonText: '确认',
    confirmButtonClass: tip.class,
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
    async callback(a: string) {
      if (a === 'confirm') {
        isLoading.value = true
        let res
        if (type === 'insert') {
        } else if (type === 'update') {
          if (!rawData) return
          res = await updateMenu(+rawData.id, data as UpdateMenuDTO)
        } else if (type === 'delete') {
          res = await batchDeleteMenuByMenuId(+data as number)
        } else if (type === 'batchDel') {
          if (!selectList.value.length) {
            isLoading.value = false
            return ElMessage.error('请选择删除行数据！')
          }
        } else {
          return
        }
        if (!res) return
        isLoading.value = false
        if (res.data.code === StatusCode.SUCCESS) {
          isShowForm.value = false
          if (type === 'insert' || type === 'update' || type === 'batchDel' || type === 'delete') loadData()
          clearForm()
          ElNotification({
            title: `${tip.title}提示`,
            message: res.data.msg || `${tip.title}成功！`,
            type: 'success',
            duration: 2000,
          })
        } else {
          ElMessage.closeAll('error')
          ElMessage.error(res.data.msg || `${tip.title}失败，请稍后再试！`)
        }
      }
    },
  })
}

const formRef = ref()
/**
 * 验证表单
 */
function checkForm(call: () => any) {
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    call && call()
  })
}

/**
 * 关闭弹窗 之前
 * @param done 是否完成
 * @param doneBack 关闭后的回调
 */
function onBeforeCloseDialog(done: () => void, doneBack?: () => any, cancelBack?: () => any, flag?: boolean) {
  if (flag) {
    ElMessageBox.confirm('是否放弃修改？', '操作提醒', {
      confirmButtonText: '放弃',
      confirmButtonClass: 'el-button--danger',
      cancelButtonText: '取消',
      center: true,
    })
      .then(() => {
        // 确认退出
        doneBack && doneBack()
        done()
      })
      .catch(() => {
        // 取消
        cancelBack && cancelBack()
      })
  } else {
    done()
  }
}
// 清除表单
function clearForm(call?: () => void) {
  form.value = {
    id: undefined,
    code: undefined,
    name: undefined,
    parentId: undefined,
    linkUrl: undefined,
    sortOrder: undefined,
    sysType: undefined,
    type: undefined,
  }
  call && call()
}

/**
 * 导出表格
 */
function onExportExcel() {
  ElMessageBox.confirm('确认导出表格？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
    center: true,
    callback(res: string) {
      if (res === 'confirm') {
        const rawData = selectList.value.length > 0 ? selectList.value : menuListTree.value
        if (rawData.length === 0) return ElMessage.error('没有选中导出的数据！')
        exportExcel<Partial<MenuVO>>(
          rawData,
          ['id', 'name', 'parentId', 'code', 'intro', 'updateTime', 'createTime'],
          {
            id: '菜单ID',
            name: '菜单名称',
            creator: '创建者',
            parentId: '父ID',
            intro: '备注',
            code: '菜单码CODE',
            updateTime: '更新时间',
            createTime: '创建时间',
          },
          { filename: `菜单列表-${useDateFormat(new Date(), 'YYYY-MM-DD').value}.xlsx` },
        )
      }
    },
  })
}

/**
 * 重置筛选
 */
function resetSearchOption() {
  searchDTO.value = {
    code: undefined,
    name: undefined,
    creator: undefined,
    parentId: undefined,
    roleId: undefined,
    timeSort: undefined,
  }
  loadData()
}

const isShowForm = ref(false)
/**
 * 显示弹窗
 * @param row table选中的行
 */
function onShowInfoDetail(row?: Partial<MenuVO>, call?: () => any) {
  // 修改
  if (row?.id) {
    form.value = {
      id: undefined,
      code: undefined,
      name: undefined,
      parentId: undefined,
      linkUrl: undefined,
      sortOrder: undefined,
      sysType: undefined,
      type: undefined,
      ...row,
    }
  }
  call && call()
  isShowForm.value = true
}
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
      height="72vh"
      @row-click="(item:MenuVO)=>(theRowInfo = item)"
      @selection-change="onSelectChange">
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
      <el-table-column fixed="right" label="操作" min-width="240%">
        <template #header>
          显示：
          <el-switch
            v-model="toggleTableTree"
            inactive-text="分页"
            active-text="树形"
            inline-prompt
            style="--el-switch-on-color: var(--el-color-info)" />
        </template>
        <template #default="{ row }">
          <div class="flex opacity-0 transition-200 group-hover:opacity-100">
            <!-- 预览 -->
            <div
              class="mx-2 btn-default hover:text-[var(--el-color-info)]"
              style="padding: 0rem 0.6rem"
              @click="onShowInfoDetail(row, () => (isEdit = false))">
              <i i-solar:eye-bold-duotone p-0.5em />
            </div>
            <!-- 编辑 -->
            <el-button
              icon="Edit"
              type="success"
              style="padding: 0rem 0.6rem"
              @click="onShowInfoDetail(row, () => (isEdit = true))" />
            <!-- 删除 -->
            <el-button
              type="danger"
              style="padding: 0rem 0.6rem"
              icon="delete"
              @click="onSubmit('delete', row.id, row)" />
            <!-- 添加子项 -->
            <el-button
              icon="Plus"
              type="primary"
              style="padding: 0rem 0.6rem"
              @click="onShowInfoDetail({ parentId: row.id, children: row?.children }, () => (isEdit = true))" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <footer flex-row-bt-c>
      <small>
        共<strong class="text-1rem text-[var(--el-color-primary)]">{{ menuListTreeLength }}</strong
        >菜单
      </small>
    </footer>
    <!-- 菜单信息查看 -->
    <el-dialog
      v-model="isShowForm"
      class="view-dialog"
      align-center
      width="fit-content"
      :before-close="(done:()=>void) => isShowForm && onBeforeCloseDialog(done, clearForm, undefined, isUpdate)">
      <template #header>
        <h3 text-center>菜单详情</h3>
        <div relative w-80vw md:w-380px>
          <el-form
            ref="formRef"
            :model="form"
            :disabled="isLoading || !isEdit"
            label-width="6em"
            label-position="left"
            class="mt-6 p-4 md:p-6"
            hide-required-asterisk>
            <el-form-item v-if="form.id" prop="id" label="菜单ID">
              <CopyText :text="form.id" />
            </el-form-item>
            <!-- 菜单名称 -->
            <el-form-item
              prop="name"
              :rules="[
                { required: true, message: '请填写菜单名称！', trigger: 'blur' },
                { min: 1, max: 50, message: '长度为1-50字符！', trigger: ['change', 'blur'] },
              ]"
              label="菜单名">
              <el-input v-model="form.name" class="w-full" placeholder="请填写菜单名称" label="菜单名" />
            </el-form-item>
            <!-- 菜单code -->
            <el-form-item
              prop="code"
              :rules="[
                { required: true, message: '请填写菜单code！', trigger: 'blur' },
                { min: 1, max: 100, message: '长度为1-100字符！', trigger: ['change', 'blur'] },
              ]"
              label="菜单code">
              <el-input v-model="form.code" class="w-full" placeholder="请填写菜单code" />
            </el-form-item>
            <!-- 关联链接 -->
            <el-form-item
              prop="linkUrl"
              :rules="[{ min: 1, max: 200, message: '长度为1-200字符！', trigger: ['change', 'blur'] }]"
              label="关联链接">
              <el-input v-model="form.linkUrl" class="w-full" placeholder="关联链接（选填）" />
            </el-form-item>
            <!-- 系统类别 -->
            <el-form-item
              prop="sysType"
              :rules="[
                {
                  type: 'number',
                  min: 0,
                  max: Object.keys(SysTypeObj).length - 1 || 0,
                  message: '范围1-99之间！',
                  trigger: ['change', 'blur'],
                },
              ]"
              label="系统类别">
              <el-select v-model="form.sysType" placeholder="请选择系统类别" class="w-full" no-data-text="没有数据">
                <el-option v-for="p in Object.values(SysTypeObj)" :key="p.value" :label="p.label" :value="p.value" />
              </el-select>
            </el-form-item>
            <!-- 节点类型 -->
            <el-form-item
              prop="type"
              :rules="[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  max: Object.keys(SysTypeObj).length || 0,
                  message: '范围1-99之间！',
                  trigger: ['change', 'blur'],
                },
              ]"
              label="节点类型">
              <el-select v-model="form.type" class="w-full" placeholder="请选择节点类型" no-data-text="没有数据">
                <el-option v-for="p in Object.values(MenuTypeObj)" :key="p.label" :value="p.value" :label="p.label" />
              </el-select>
            </el-form-item>
            <!-- 父菜单 -->
            <!-- 权重 -->
            <el-form-item
              prop="sortOrder"
              :rules="[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  max: 99,
                  message: '范围1-99之间！',
                  trigger: ['change', 'blur'],
                },
              ]"
              label="权重">
              <el-input-number v-model="form.sortOrder" :min="1" :max="99" style="width: 60%" placeholder="权重" />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <el-button type="danger" plain @click="isShowForm = false && clearForm()"> 关闭 </el-button>
        <el-button v-if="!form?.id" type="info" @click="checkForm(onSubmit.bind(null, 'insert', form))">
          添加
        </el-button>
        <el-button v-else type="info" :disabled="!isUpdate" @click="checkForm(onSubmit.bind(null, 'update', form))">
          保存修改
        </el-button>
      </template>
    </el-dialog>
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
