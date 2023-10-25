<script lang="ts" setup>
import { useDateFormat } from '@vueuse/core'
import type { CascaderProps } from 'element-plus'
import { compareObjects } from '@/utils'

import TableLayout from '@/layouts/TableLayout.vue'
enum Gender {
  BOY = '男',
  GIRL = '女',
  DEFAULT = '保密',
}
const user = ref({
  userInfo: {
    id: '123',
  },
})

// 数据
const pageInfo = ref<any>({
  records: [],
  total: 100,
  pages: 1,
  size: 10,
  current: 1,
})
// 参数
const page = ref<number>(1)
const size = ref<number>(7)
// 数据
const updateTime = ref<string>()
const formRef = ref()

// 是否编辑
const isEdit = ref<boolean>(false)
// 是否显示表单
const isShowForm = ref<boolean>(false)
// loading状态
const isLoading = ref<boolean>(false)
// 当前行
const theRowInfo = ref<any>()

// 多选
const selectList = ref<any[]>([])
function onSelectChange(list: any) {
  // 添加
  selectList.value = list?.length ? list : []
}

// 表单参数
const form = ref<any>({
  status: 0,
  id: undefined,
  username: undefined,
  avatar: undefined,
  birthday: undefined,
  gender: undefined,
  nickname: undefined,
  password: undefined,
})
// 验证规则
const formRules = reactive({
  nickname: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { min: 1, max: 40, message: '长度在1-40个字符！', trigger: 'blur' },
  ],
  username: [
    { required: true, message: '用户名不能为空！', trigger: 'blur' },
    { min: 6, max: 30, message: '长度在6-30个字符！', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空！', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度6-20位！', trigger: 'blur' },
    {
      pattern: /^\w{6,20}$/,
      message: '密码字母数字下划线组成',
      trigger: 'change',
    },
  ],
})

// 头像上传
const avatarList = ref<any>([])
function onError(val: string) {
  ElMessage.error(val)
}
function onSubmitAvatar(key: string) {
  form.value.avatar = key
}

// 查询参数
const isShowSearch = ref<boolean>(true)
const searchDTO = ref<any>({
  createTimeSort: undefined,
  isCustomer: undefined,
  keyWord: undefined,
  status: undefined,
  userId: undefined,
})

// 检查表单是否更新
const isUpdate = computed(() => {
  if (theRowInfo.value) return Object.keys(compareObjects(theRowInfo.value, form.value)).length > 0
  else return false
})

/**
 * 加载数据
 */
async function loadData() {
  if (isLoading.value) return
  if (pageInfo.value.records.length) isLoading.value = true
  // 请求
  updateTime.value = useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value
  pageInfo.value.records = [
    {
      id: '1',
      avatar: 'https://p.qqan.com/up/2021-2/16131991195037580.jpg',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '2',
      avatar: 'https://p.qqan.com/up/2021-2/16131991195037580.jpg',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '3',
      avatar: 'https://p.qqan.com/up/2021-2/16131991195037580.jpg',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '4',
      avatar: 'https://p.qqan.com/up/2021-2/16131991195037580.jpg',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '5',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '5',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '5',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
    {
      id: '5',
      birthday: '1990-01-01',
      createTime: '2021-02-15 16:00:00',
      email: '123@qq.com',
      gender: '男',
      isEmailVerified: 1,
      isPhoneVerified: 1,
      lastLoginTime: '2021-02-15 16:00:00',
      nickname: '张三',
      phone: '13888888888',
      status: 1,
      updateTime: '2021-02-15 16:00:00',
      username: 'zhangsan',
    },
  ]
  setTimeout(() => {
    isLoading.value = false
  }, 300)
}

/**
 * 监听查询参数和分页信息的变化
 */
watch(
  [searchDTO, page, size],
  () => {
    loadData()
  },
  { immediate: true },
)

/**
 * 用户进行的操作
 * @param type 用户操作类型: 新增 修改 删除 下线 批量删除
 * @param data 传递的数据
 * @param rawData 当前行
 */
async function onSubmit(
  type: 'insert' | 'update' | 'delete' | 'logout' | 'batchDel',
  data: string | string[] | any,
  rawData = theRowInfo.value!,
) {
  const tip = {
    class: 'el-button--primary',
    title: '操作',
  }
  if (type === 'insert') {
    tip.title = '添加用户'
  } else if (type === 'delete') {
    tip.class = 'el-button--danger'
    tip.title = '删除该用户'
  } else if (type === 'update') {
    tip.title = '保存更新'
  } else if (type === 'batchDel') {
    tip.title = '批量删除'
    tip.class = 'el-button--danger'
  } else if (type === 'logout') {
    tip.title = '强制下线'
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
        // 新增
        if (type === 'insert') {
          // 修改
        } else if (type === 'update') {
          if (!rawData) return
          // 下线
        } else if (type === 'logout') {
          ElMessage.success('强制下线成功！')
          // 批量删除
        } else if (type === 'batchDel') {
          if (!selectList.value.length) {
            isLoading.value = false
            return ElMessage.error('请选择删除行数据！')
          } else {
            ElMessage.success('批量删除成功！')
          }
        } else {
          return
        }
        isLoading.value = false
        if (!res) return

        isShowForm.value = false
        if (type === 'insert' || type === 'update') loadData()
        clearForm()
        ElNotification({
          title: `${tip.title}提示`,
          message: `${tip.title}成功！`,
          type: 'success',
          duration: 2000,
        })
      } else {
        ElMessage.closeAll('error')
        ElMessage.error(`${tip.title}失败，请稍后再试！`)
      }
    },
  })
}

/**
 * 验证校验
 */
function checkForm(call: () => any) {
  formRef.value?.validate(async (valid: boolean) => {
    if (!valid) return
    call && call()
  })
}

/**
 * 用户状态切换
 */
async function onToggleChange(id: string, toggle: number, alertText: string, callback?: () => void) {
  if (!id || toggle === undefined) return false
  // 请求
  const data = await ElMessageBox.confirm(`确定用户${alertText}吗？`, '操作提醒', {
    confirmButtonText: alertText,
    confirmButtonClass: toggle ? 'el-button--danger' : 'el-button--info',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  })
  if (data === 'confirm') {
    ElMessage.success(`${alertText}成功！`)
    callback && callback()
    return true
  } else {
    return false
  }
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
    status: 0,
    username: undefined,
    avatar: undefined,
    birthday: undefined,
    gender: '保密',
    nickname: undefined,
    password: undefined,
  }
  call && call()
}

/**
 * 显示弹窗
 * @param row table选中的行
 */
function onShowInfoDetail(row?: any, call?: () => any) {
  if (row) {
    form.value = {
      ...row,
    }
    if (row?.avatar && row?.avatar !== 'default.png') {
      avatarList.value = [
        {
          file: undefined,
          key: row.avatar,
          id: row.avatar,
          status: 'success',
          percent: 100,
        },
      ]
    }
  } else {
    clearForm()
  }
  call && call()
  isShowForm.value = true
}

// 绑定角色
const isShowRoleForm = ref(false)
const roleForm = reactive<{
  userId?: string
  roleIds: string[]
  roleTree?: any
  isUpdate: boolean
  props?: CascaderProps
}>({
  userId: undefined,
  roleTree: [],
  roleIds: [],
  isUpdate: false,
  props: {
    multiple: true,
    value: 'id', // 值key
    label: 'name', // 显示标签key
    children: 'children',
    checkStrictly: true, // 严格
    emitPath: false, // false返回当前选中
  },
})
watch(
  () => roleForm.roleIds,
  (val) => {
    roleForm.isUpdate = true
  },
)
/**
 * 获取当前用户角色列表
 */
async function onShowInfoRole(userId: string) {
  if (userId) {
    roleForm.userId = userId
    loadInfoRoleTree()
    //  roleForm.roleIds = res.data.data.map((p) => p.id)
    roleForm.roleIds = []
    isShowRoleForm.value = true
  }
}

/**
 * 加载角色树
 */
async function loadInfoRoleTree() {
  roleForm.roleTree = []
}

/**
 * 提交修改角色绑定
 */
function onSubmitRoleBind(userId: string, ids: string[]) {
  if (!userId) return
  ElMessageBox.confirm('是否确认绑定？', '操作提醒', {
    confirmButtonText: '确认',
    confirmButtonClass: 'el-button--danger',
    cancelButtonText: '取消',
    center: true,
    callback: async (action: string) => {
      if (action === 'confirm') {
        ElNotification.success({
          title: '绑定提示',
          message: '绑定角色成功！',
        })
      }
      isShowRoleForm.value = false
    },
  })
}

/**
 * 导出表格
 */
function onExportExcel() {}
/**
 * 重置筛选
 */
function resetSearchOption() {
  page.value = 1
  searchDTO.value = {
    createTimeSort: undefined,
    isCustomer: undefined,
    keyWord: undefined,
    status: undefined,
    userId: undefined,
  }
  loadData()
}
</script>
<template>
  <div>
    <TableLayout :header="{ title: `用户管理`, updateTime }">
      <!-- 菜单 -->
      <template #menu>
        <div
          mr-4
          :class="!isShowSearch ? 'scale-x-90  opacity-0' : ' scale-x-100 opacity-100'"
          class="flex-shrink-0 transform-origin-left-center overflow-hidden transition-300 transition-all"
          flex="~ gap-2 md:gap-4 items-center">
          <small sticky left-0 flex-shrink-0 opacity-70>筛选：</small>
          <!-- 用户名 -->
          <el-input
            v-model="searchDTO.keyWord"
            class="w-auto"
            prefix-icon="Search"
            placeholder="用户名（ Enter ）"
            label="用户名"
            :disabled="isLoading"
            @keyup.enter="loadData" />
          <!-- 注册排序 -->
          <el-checkbox
            v-model="searchDTO.createTimeSort"
            border
            class="card-default"
            :true-label="1"
            :false-label="0"
            @change="loadData">
            <i i-solar:sort-by-time-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.createTimeSort === undefined">注册排序</span>
            <span v-show="searchDTO.createTimeSort !== undefined">
              {{ searchDTO.createTimeSort ? ' 时间降序' : '时间升序' }}
            </span>
          </el-checkbox>
          <!-- 是否禁用 -->
          <el-checkbox
            v-model="searchDTO.status"
            :indeterminate="searchDTO.status === undefined"
            border
            class="card-default"
            :true-label="1"
            :false-label="0"
            @change="loadData">
            <i i-solar:user-block-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.status === undefined">是否禁用</span>
            <span v-show="searchDTO.status !== undefined">
              {{ searchDTO.status ? '禁用' : '正常' }}
            </span>
          </el-checkbox>
          <!-- 全部人员 -->
          <el-checkbox
            v-model="searchDTO.isCustomer"
            :indeterminate="searchDTO.isCustomer === undefined"
            border
            class="card-default"
            :true-label="1"
            :false-label="0"
            @change="loadData">
            <i i-solar:user-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.isCustomer === undefined">全部人员</span>
            <span v-show="searchDTO.isCustomer !== undefined">
              {{ searchDTO.isCustomer ? '前台人员' : '后台人员' }}
            </span>
          </el-checkbox>
          <el-button plain type="danger" @click="resetSearchOption"> 重置 </el-button>
        </div>
        <div ml-a flex>
          <!-- 按钮 -->
          <TableDefaultBtns
            :menu="[
              { show: true, title: '导出', methods: onExportExcel, icon: 'i-solar:printer-outline ', type: 'default', plain: false },
              {
                show: selectList.length > 0,
                title: '批量',
                methods: () => {
                  onSubmit('batchDel', selectList.map(p => p.id) as string[] || [])
                },
                icon: 'i-solar:trash-bin-minimalistic-broken ',
                type: 'danger',
              },
              { show: true, title: isShowSearch ? '取消' : '筛选', methods: () => isShowSearch = !isShowSearch, icon: 'i-solar:sort-from-top-to-bottom-line-duotone ', type: 'default' },
              { show: true, title: '刷新', methods: loadData, icon: 'i-solar:refresh-outline', type: 'info' },
              { show: true, plain: false, title: '添加', methods: onShowInfoDetail.bind(undefined, undefined, () => isEdit = true), icon: 'i-solar:user-bold-duotone mr-2', type: 'info' },
            ]" />
        </div>
      </template>
      <!-- 表格 -->
      <template #default>
        <el-table
          v-loading="isLoading"
          :disabled="isEdit"
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
          @row-click="(row:any) => theRowInfo = row"
          @selection-change="onSelectChange">
          <!-- 选择 -->
          <el-table-column fixed type="selection" />
          <!-- 用户ID -->
          <el-table-column label="用户ID" property="id" min-width="180%" column-key="id">
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
          <!-- 昵称 -->
          <el-table-column column-key="nickname" prop="nickname" label="昵称" min-width="100%" />
          <!-- 用户名 -->
          <el-table-column column-key="username" prop="username" show-overflow-tooltip width="100%" label="用户名" />
          <!-- 性别 -->
          <el-table-column column-key="gender" prop="gender" width="100%" show-overflow-tooltip label="性别" />
          <!-- 用户头像 -->
          <el-table-column column-key="name" prop="name" width="100%" label="用户头像">
            <template #default="{ row }">
              <el-scrollbar height="4rem">
                <div class="flex">
                  <el-image
                    :preview-src-list="[row.avatar]"
                    :preview-teleported="true"
                    class="mr-2 h-4rem w-4rem flex-shrink-0 border-bluegray border-default v-card"
                    fit="cover"
                    loading="lazy"
                    :src="row.avatar"
                    @click.stop="() => {}">
                    <template #error>
                      <small h-full w-full flex-row-c-c opacity-60 card-default> 未上传 </small>
                    </template>
                  </el-image>
                </div>
              </el-scrollbar>
            </template>
          </el-table-column>
          <!-- 用户类别 -->
          <el-table-column label="用户类别" column-key="userType" prop="userType" width="100%">
            <template #default="{ row }">
              <el-tag :type="row?.userType ? 'warning' : 'info'">
                {{ row?.userType ? '后台用户' : '前台用户' }}
              </el-tag>
            </template>
          </el-table-column>
          <!-- 用户状态 -->
          <el-table-column label="用户状态" align="center" column-key="status" prop="status">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                :disabled="row?.id === user.userInfo?.id"
                class="mx-a transition-200 active:scale-90"
                style="--el-switch-on-color: var(--el-color-info); --el-switch-off-color: var(--el-color-error)"
                inline-prompt
                active-text="正常"
                :active-value="1"
                inactive-text="封禁"
                :before-change="onToggleChange.bind(null, row.id, row.status, row.status ? '封禁用户' : '改为正常')"
                :inactive-value="0"
                @click.stop="() => {}" />
            </template>
          </el-table-column>
          <!-- 更新时间 -->
          <el-table-column column-key="updateTime" prop="updateTime" label="更新时间" sortable width="180%" />
          <!-- 创建时间 -->
          <el-table-column column-key="createTime" prop="createTime" label="创建时间" sortable min-width="180%" />
          <!-- 动作+弹窗 -->
          <el-table-column fixed="right" label="操作" min-width="280%">
            <template #default="{ row }">
              <div class="flex opacity-0 transition-200 group-hover:opacity-100">
                <!-- 预览 -->
                <div
                  class="mx-2 btn-default hover:text-[var(--el-color-info)]"
                  style="padding: 0rem 0.6rem"
                  @click.stop="
                    () => {
                      isEdit = false
                      onShowInfoDetail(row)
                    }
                  ">
                  <i i-solar:eye-bold-duotone p-0.5em />
                </div>
                <!-- 编辑 -->
                <el-button
                  icon="Edit"
                  type="success"
                  style="padding: 0rem 0.6rem"
                  @click.stop="
                    () => {
                      isEdit = true
                      onShowInfoDetail(row)
                    }
                  " />
                <!-- 下线 -->
                <el-button
                  type="danger"
                  :plain="false"
                  style="padding: 0rem 0.6rem"
                  border-default
                  @click="onSubmit('logout', row, row)">
                  <i i-solar:archive-down-minimlistic-bold-duotone mr-1 p-0.5em />
                  下线
                </el-button>
                <!-- 角色 -->
                <el-button
                  type="info"
                  :plain="false"
                  style="padding: 0rem 0.6rem"
                  border-default
                  @click="onShowInfoRole(row.id)">
                  <i i-solar:shield-user-bold-duotone mr-1 p-0.5em />
                  角色
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 页脚 -->
      <template #footer>
        <el-pagination v-model:current-page="page" background layout="prev, pager, next" :page-count="pageInfo.pages" />
        <small>
          共
          <strong class="text-1rem text-[var(--el-color-primary)]">
            {{ pageInfo.total }}
          </strong>
          个用户
        </small>
      </template>
    </TableLayout>
    <!-- 用户信息查看 -->
    <el-dialog
      v-model="isShowForm"
      class="view-dialog"
      align-center
      draggable
      width="fit-content"
      :before-close="(done:()=>void) => isShowForm && onBeforeCloseDialog(done, clearForm, undefined, isUpdate)">
      <template #header>
        <h3 text-center>用户详情</h3>
      </template>
      <div relative w-80vw md:w-380px>
        <el-form
          ref="formRef"
          :rules="formRules"
          :model="form"
          :disabled="isLoading || !isEdit"
          label-width="4em"
          label-position="left"
          class="p-4 md:p-6"
          hide-required-asterisk>
          <el-form-item prop="avatar">
            <div class="w-full flex-row-c-c">
              <el-image
                :src="form.avatar"
                fit="cover"
                class="w-6rem mr-4em h-6rem rounded-1/2 mx-a flex-row-c-c flex-shrink-0 v-card"
                :lazy="true"></el-image>
            </div>
          </el-form-item>
          <el-form-item v-if="form.id" prop="id" label="用户ID">
            <CopyText :text="form.id" />
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item prop="nickname" label="昵称">
            <el-input v-model="form.nickname" placeholder="请填写用户昵称（1-40字符）" />
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" placeholder="请填写用户名（6-30字符）" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item v-if="isEdit && form.password" prop="password" label="密码">
            <el-input v-model="form.password" placeholder="请填写用户密码（1-20字符）" />
          </el-form-item>
          <!-- 性别 -->
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-if="form.gender" v-model="form.gender" fit="var(-el-color-primary)">
              <el-radio-button v-for="(p, i) in [Gender.DEFAULT, Gender.BOY, Gender.GIRL]" :key="i" :label="p" border />
            </el-radio-group>
          </el-form-item>
          <!-- 生日 -->
          <el-form-item prop="birthday" label="生日">
            <el-date-picker v-model="form.birthday" type="date" class="w-full" placeholder="选择出生年月日（选填）" />
          </el-form-item>
          <div flex items-center gap-2>
            <!-- 状态 -->
            <el-form-item prop="status" label="状态">
              <el-switch
                v-model="form.status"
                class="mx-a transition-200 active:scale-90"
                style="--el-switch-on-color: var(--el-color-info); --el-switch-off-color: var(--el-color-error)"
                inline-prompt
                active-text="正常"
                :active-value="1"
                inactive-text="封禁"
                :inactive-value="0" />
            </el-form-item>
          </div>
        </el-form>
      </div>
      <template #footer>
        <el-button type="danger" plain @click="isShowForm = false && clearForm()"> 关闭 </el-button>
        <el-button v-if="!isEdit && !form?.id" type="info" @click="checkForm(onSubmit.bind(null, 'insert', form))">
          添加
        </el-button>
        <el-button
          v-else
          type="info"
          :disabled="isEdit && !isUpdate"
          @click="checkForm(onSubmit.bind(null, 'update', form))">
          保存修改
        </el-button>
      </template>
    </el-dialog>
    <!-- 角色绑定列表 -->
    <el-dialog
      v-model="isShowRoleForm"
      class="view-dialog"
      align-center
      width="fit-content"
      :before-close="(done:()=>void) => isShowRoleForm && onBeforeCloseDialog(done, clearForm, undefined, roleForm.isUpdate)">
      <template #header>
        <h3 text-center>角色赋予</h3>
      </template>
      <!-- 选择器 -->
      <div class="w-80vw md:w-400px">
        <el-cascader-panel
          v-model="roleForm.roleIds"
          placeholder="请选择对应角色"
          no-data-text="没有数据"
          class="w-full"
          :teleported="false"
          popper-class="w-full"
          :options="roleForm.roleTree"
          clearable
          :props="roleForm.props"
          collapse-tags
          collapse-tags-tooltip
          :max-collapse-tags="10"
          :check-strictly="true"
          :show-all-levels="false"
          tag-type="info" />
      </div>
      <template #footer>
        <el-button
          class="ml-a"
          type="info"
          :disabled="!roleForm.isUpdate"
          @click="onSubmitRoleBind(roleForm.userId || '', roleForm.roleIds)">
          保存绑定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
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
</style>
