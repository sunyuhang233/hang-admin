<script setup lang="ts">
import { batchDelRoleById, batchDelRoleByIds, getRoleList, getRoleTree, insertRole, updateRole } from '@/api/user/role'
import type { IPage } from '@/types'
import { StatusCode } from '@/types'
import type { InsertRoleDTO, RoleTreeVO, RoleVO, SelectPageRoleDTO, UpdateRoleDTO } from '@/types/user/role'
import { compareObjects } from '@/utils'
import { exportExcel } from '@/utils/elsx'
import { useDateFormat, useLocalStorage } from '@vueuse/core'
const pageNo = ref(1)
const pageSize = ref(10)

// 表格数据
const pageInfo = ref<IPage<RoleTreeVO>>({
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
const searchDTO = ref<SelectPageRoleDTO>({
  code: undefined,
  name: undefined,
  creator: undefined,
  parentId: undefined,
  roleId: undefined,
  timeSort: undefined,
})

/**
 *  加载数据
 * @param type 加载类型 列表还是树形
 */
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

// 监听搜索条件和分页数据的变化
watch([searchDTO, pageNo, pageSize], () => {
  loadData()
})

/**
 *  重置查询条件
 */
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

const selectList = ref<RoleVO[]>([])
const isEdit = ref(false)

/**
 *  导出数据
 */
function openExportExcel() {
  ElMessageBox.confirm('确认导出表格？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
    center: true,
    callback(res: string) {
      if (res === 'confirm') {
        const rawData = selectList.value.length > 0 ? selectList.value : (pageInfo.value.records as Partial<RoleVO>[])
        if (rawData.length === 0) return ElMessage.error('没有选中导出的数据！')

        exportExcel<Partial<RoleVO>>(
          rawData,
          ['id', 'name', 'parentId', 'code', 'intro', 'updateTime', 'createTime'],
          {
            id: '角色ID',
            name: '角色名称',
            creator: '创建者',
            parentId: '父角色ID',
            intro: '备注',
            code: '角色码CODE',
            updateTime: '更新时间',
            createTime: '创建时间',
          },
          { filename: `角色列表-第${pageNo.value}页-${useDateFormat(new Date(), 'YYYY-MM-DD').value}.xlsx` },
        )
      }
    },
  })
}

/**
 *
 * @param type 事件类型
 * @param data 传递的数据
 * @param rawData 当前行的数据
 */
type methodType = 'insert' | 'update' | 'delete' | 'batchDel'
function onSubmit(type: methodType, data: string | number[] | Partial<RoleVO>, rawData: RoleVO = theRowInfo.value!) {
  const tip = {
    class: 'el-button--primary',
    title: '操作',
  }
  if (type === 'insert') {
    tip.title = '角色'
  } else if (type === 'delete') {
    tip.class = 'el-button--danger'
    tip.title = '角色'
  } else if (type === 'update') {
    tip.title = '保存更新'
  } else if (type === 'batchDel') {
    tip.title = '批量删除'
    tip.class = 'el-button--danger'
  } else {
    return
  }

  // 二次确认
  ElMessageBox.confirm(`是否确认${tip.title}？`, '操作提醒', {
    confirmButtonText: '确认',
    confirmButtonClass: tip.class,
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
    async callback(action: string) {
      if (action === 'confirm') {
        isLoading.value = true
        let res = null

        if (type === 'insert') {
          res = await insertRole(data as InsertRoleDTO)
        } else if (type === 'update') {
          if (!rawData) return
          res = await updateRole(rawData.id!, compareObjects(rawData, data as Partial<RoleVO>) as UpdateRoleDTO)
        } else if (type === 'delete') {
          res = await batchDelRoleById(data as number)
        } else if (type === 'batchDel') {
          if (!selectList.value.length) {
            isLoading.value = false
            return ElMessage.error('请选择删除行数据！')
          }
          res = await batchDelRoleByIds((data as string[]) || selectList.value.map((p) => p.id))
        } else return

        isLoading.value = false

        if (!res) return

        if (res.data.code === StatusCode.SUCCESS) {
          isShowForm.value = false
          if (type === 'insert' || type === 'update' || type === 'delete' || type === 'batchDel') {
            loadData()
          }
          clearForm()
          ElNotification({
            title: `${tip.title}提示`,
            message: res.data.message || `${tip.title}成功！`,
            type: 'success',
            duration: 2000,
          })
        } else {
          ElMessage.closeAll('error')
          ElMessage.error(res.data.message || `${tip.title}失败，请稍后再试！`)
        }
      } else {
        ElMessage.info('取消操作')
      }
    },
  })
}

/**
 *  多选
 * @param list 选中的数据
 */
function onSelectChange(list: RoleVO[]) {
  selectList.value = list.length ? list : []
}

const theRowInfo = ref<RoleVOExt>()
interface RoleVOExt extends RoleVO {
  permissionList?: string[]
}
// 表单参数
const form = ref<Partial<RoleVO & InsertRoleDTO>>({
  id: undefined,
  code: undefined,
  name: undefined,
  intro: undefined,
  parentId: undefined,
  permissionList: [],
})

const isShowForm = ref(false)
const isFormLoading = ref(false)

/**
 *  显示当前行的数据详情
 */
async function onShowInfoDetail(row?: RoleVO, call?: () => any) {
  if (row) {
    form.value = {
      ...row,
    }
    // 查询对应权限列表
  } else {
    form.value = {
      id: undefined,
      code: undefined,
      name: undefined,
      intro: undefined,
      parentId: undefined,
      permissionList: [],
    }
  }
  call && call()
  isShowForm.value = true
}

const formRef = ref()

/**
 *  表单当前项和表单数据是否发生了变化
 */
const isUpdate = computed(() => {
  if (theRowInfo.value) return Object.keys(compareObjects(theRowInfo.value, form.value as Partial<RoleVO>)).length > 0
  else return false
})

/**
 * 关闭弹窗 之前 diff
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
    code: undefined,
    name: undefined,
    intro: undefined,
    parentId: undefined,
  }
  formRef.value?.resetFields()
  call && call()
}
/**
 * 验证表单
 */
function checkForm(call?: () => any) {
  formRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      call && call()
    } else {
      return
    }
  })
}

const isSelectLoading = ref(false)
const parentList = ref<RoleVO[]>([])

/**
 *  加载角色的数据
 * @param val 父级id
 */
async function remoteMethod(val: string) {
  if (isSelectLoading.value) return
  const dto: SelectPageRoleDTO = val ? { name: val, code: val } : {}
  isSelectLoading.value = true
  const res = await getRoleList(1, 50, dto)
  if (res.data.code === StatusCode.SUCCESS) {
    parentList.value = res.data.data.records
    setTimeout(() => {
      isSelectLoading.value = false
    }, 500)
  }
}
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
                methods:onShowInfoDetail.bind(undefined,undefined,()=>isEdit=true),
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
      height="72vh"
      @row-click="(row:RoleVO)=>theRowInfo = { ...row, permissionList: [] }"
      @selection-change="onSelectChange">
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
            <el-button type="danger" style="padding: 0rem 0.6rem" icon="delete" @click="onSubmit('delete', row.id)" />
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
    <!-- 角色查看器 -->
    <el-dialog
      v-model="isShowForm"
      v-loading="isFormLoading"
      class="view-dialog"
      align-center
      draggable
      width="fit-content"
      :before-close="(done:()=>void) => isShowForm && onBeforeCloseDialog(done, clearForm, undefined, isUpdate)">
      <template #header>
        <h3 text-center>角色详情</h3>
      </template>
      <div relative w-80vw md:w-380px>
        <el-form
          ref="formRef"
          :model="form"
          :disabled="isLoading || !isEdit"
          label-width="6em"
          label-position="left"
          class="p-4 md:p-6"
          hide-required-asterisk
          ><el-form-item v-if="form.id" prop="id" label="角色ID"> <CopyText :text="form.id" /> </el-form-item>
          <!-- 角色名称 -->
          <el-form-item
            prop="name"
            :rules="[
              { required: true, message: '请填写角色名称！', trigger: 'blur' },
              { min: 1, max: 100, message: '长度为1-100字符！', trigger: ['change', 'blur'] },
            ]"
            label="角色名称">
            <el-input v-model="form.name" placeholder="请填写名称（1-100字符）" />
          </el-form-item>
          <!-- 角色code -->
          <el-form-item
            prop="code"
            :rules="[
              { required: true, message: '请填写角色CODE！', trigger: 'blur' },
              { pattern: /^[A-Z](_*[A-Z])*_[A-Z]+$/, message: 'CODE要求为首尾大写字母中间_分隔！', trigger: 'change' },
              { min: 1, max: 50, message: '长度为1-50字符！', trigger: ['change', 'blur'] },
            ]"
            label="角色CODE">
            <el-input v-model="form.code" placeholder="请填写角色码CODE（1-50字符）" />
          </el-form-item>
          <!-- 备注 -->
          <el-form-item
            prop="name"
            :rules="[{ min: 1, max: 100, message: '长度为1-100字符！', trigger: ['change', 'blur'] }]"
            label="备注">
            <el-input v-model="form.intro" placeholder="角色备注（1-100字符）" />
          </el-form-item>
          <!-- 关联父角色 -->
          <el-form-item
            prop="parentId"
            :rules="[{ required: true, message: '请填写角色父id！', trigger: ['change', 'blur'] }]"
            label="父角色">
            <el-select
              v-model="form.parentId"
              no-data-text="没有数据"
              class="w-full flex-shrink-0"
              popper-class="w-full"
              :teleported="false"
              filterable
              reserve-keyword
              clearable
              remote
              placeholder="关联父角色(选填)"
              :loading="isSelectLoading"
              :remote-method="remoteMethod"
              @focus="remoteMethod('')">
              <el-option
                v-for="p in parentList"
                :key="p.id"
                truncate
                :disabled="p.id === form.id"
                border-0
                border-b-1px
                border-default
                :class="{ 'line-through': p.id === form.id }"
                style="
                  padding: 0.6rem 1rem 1rem 1rem;
                  height: fit-content;
                  width: 100%;
                  display: flex;
                  align-items: center;
                "
                :value="p.id">
                <div flex flex-col justify-center>
                  <p>{{ p.name }}</p>
                  <el-tag type="info">
                    {{ p.code }}
                  </el-tag>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button type="danger" plain @click="isShowForm = false && clearForm()">关闭</el-button>
        <el-button type="info" v-if="!form?.id" @click="checkForm(onSubmit.bind(null, 'insert', form))">添加</el-button>
        <el-button type="info" :disabled="!isUpdate" v-else @click="checkForm(onSubmit.bind(null, 'update', form))"
          >保存修改</el-button
        >
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
