<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import TableLayout from '@/layouts/TableLayout.vue'
interface UserVO {
  id?: string
  avatar?: string
  birthday?: string
  createTime?: string
  email?: string
  gender?: Gender
  isEmailVerified?: number
  isPhoneVerified?: number
  lastLoginTime?: string
  nickname?: string
  phone?: string
  status?: number
  updateTime?: string
  username?: string
}

// type Gender = undefined | null | '男' | '女' | '保密'

const dataList = ref<UserVO[]>([
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
])

interface MenuButtonType {
  title: string
  icon?: string | object | Array<string | object>
  type?: '' | 'default' | 'info' | 'text' | 'success' | 'warning' | 'primary' | 'danger'
  plain?: boolean
  show?: boolean
  methods?: () => any
}

/*--------------------------数据定义-------------------- */
enum Gender {
  BOY = '男',
  GIRL = '女',
  DEFAULT = '保密',
}

const formRef = ref()

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

/**
 * 表单数据
 */
let formData = reactive({})

/**
 * 某行数据
 */
const rowInfo = ref<any>()

/**
 * 更新时间
 */
const updateTime = ref(useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value)

/**
 * 是否加载
 */
const isLoading = ref(false)

/**
 * 是否显示form
 */
const isShowForm = ref(false)

const isEdit = ref(false)

const userId = ref('123')

/**
 * 分页信息
 */
const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 100,
})

// 查询参数
const isShowSearch = ref<boolean>(true)
const searchDTO = ref({
  createTimeSort: undefined,
  isCustomer: undefined,
  keyWord: undefined,
  status: undefined,
  userId: undefined,
})

/**
 * 初始化数据
 */
const loadData = () => {}

/**
 * 监听查询条件的变化
 */
watch(
  [searchDTO, pageInfo],
  () => {
    loadData()
  },
  { immediate: true },
)

/**
 * 重置查询条件
 */
const resetDto = () => {
  pageInfo.pageNo = 1
  searchDTO.value = {
    createTimeSort: undefined,
    isCustomer: undefined,
    keyWord: undefined,
    status: undefined,
    userId: undefined,
  }
  loadData()
}

/*--------------------------多选-------------------- */
const selectList = ref<any[]>([])
/**
 * 多选
 * @param list 选中的行
 */
const handleSelectionChange = (list: any) => {
  selectList.value = list?.length ? list : []
}

const isShowDelBatch = computed(() => selectList.value.length > 0)

/**
 * 批量删除
 */
const deleteBatch = () => {
  const ids = selectList.value.map((item) => item.id)
  if (!ids.length) {
    ElMessage.warning('请选择要删除的数据')
    return
  }
  ElMessageBox.confirm(`是否确认批量删除数据吗？`, '操作提醒', {
    confirmButtonText: '确认',
    confirmButtonClass: 'el-button--danger',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  })
    .then(() => {
      ElMessage.success('删除成功')
    })
    .catch(() => {
      ElMessage.warning('取消删除成功')
    })
}

/*--------------------------功能菜单-------------------- */

const reload = () => {
  loadData()
}
const exportUser = () => {
  console.log('导出')
}

const onShowInfoDetail = () => {
  isEdit.value = true
}

/**
 * 功能菜单
 */

/*--------------------------按钮业务逻辑-------------------- */

/**
 * 状态切换
 * @param id row的id
 * @param toggle row的状态
 * @param alertText 提示信息
 * @param callback 回调函数
 */
const beforeChange = async (id: string, toggle: number, alertText: string, callback?: () => void) => {
  if (!id || toggle === undefined) {
    return false
  }
  // 按钮选择
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
    ElMessage.info(`${alertText}取消！`)
    return false
  }
}

/**
 * 点击某行
 * @param row 当前行数据
 */
const handleRowClick = (row: any) => {
  rowInfo.value = row
  console.log('点击行', rowInfo.value)
}

/**
 * 预览
 * @param row 当前行数据
 */
const preview = (row: any) => {
  isEdit.value = false
  rowInfo.value = row
  isShowForm.value = true
  formData = {
    ...row,
  }
}

const clearForm = () => {
  formData = {
    id: undefined,
    status: 0,
    username: undefined,
    avatar: undefined,
    birthday: undefined,
    gender: '保密',
    nickname: undefined,
    password: undefined,
  }
}

const save = () => {}
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
          <small class="sticky left-0 flex-shrink-0 opacity-60">筛选:</small>
          <!-- 用户名 -->
          <el-input
            v-model="searchDTO.keyWord"
            placeholder="用户名 (Enter)"
            prefix-icon="Search"
            class="w-auto"
            label="用户名"
            :disabled="isLoading"
            @keyup.enter="loadData" />
          <!-- 注册排序 -->
          <el-checkbox v-model="searchDTO.createTimeSort" :true-label="1" :false-label="0" border @change="loadData">
            <i i-solar:sort-by-time-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.createTimeSort === undefined">注册排序</span>
            <span v-show="searchDTO.createTimeSort !== undefined">
              {{ searchDTO.createTimeSort ? ' 时间降序' : '时间升序' }}
            </span>
          </el-checkbox>

          <!-- 是否禁用 -->
          <el-checkbox
            v-model="searchDTO.status"
            :true-label="1"
            :false-label="0"
            border
            class="card-default"
            @change="loadData"
            :indeterminate="searchDTO.status === undefined">
            <i i-solar:user-block-bold-duotone mr-2 p-0.5em />
            <span v-show="searchDTO.status === undefined">是否禁用</span>
            <span v-show="searchDTO.status !== undefined">
              {{ searchDTO.status ? ' 禁用' : '正常' }}
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
          <!-- 重置 -->
          <el-button type="danger" plain @click="resetDto">重置</el-button>
        </div>
        <div class="ml-a flex">
          <TableDefaultBtns
            :menu="[
              {
                show: true,
                title: '导出',
                icon: 'i-solar:printer-outline',
                type: 'default',
                plain: false,
                methods: exportUser,
              },
              {
                show: selectList.length > 0,
                title: '批量删除',
                icon: 'i-solar:trash-bin-minimalistic-broken',
                type: 'danger',
                plain: false,
                methods: deleteBatch,
              },
              {
                show: true,
                title: isShowSearch ? '取消' : '筛选',
                icon: 'i-solar:sort-from-top-to-bottom-line-duotone ',
                type: 'default',
                methods: () => (isShowSearch = !isShowSearch),
              },
              { show: true, title: '刷新', icon: 'i-solar:refresh-outline', type: 'info', methods: reload },
              {
                show: true,
                plain: false,
                title: '添加',
                methods: onShowInfoDetail,
                icon: 'i-solar:user-bold-duotone mr-2',
                type: 'info',
              },
            ]" />
        </div>
      </template>
      <!-- 表格 -->
      <template #default>
        <el-table
          @row-click="handleRowClick"
          @selection-change="handleSelectionChange"
          :header-cell-style="{
            padding: '1rem 0',
            fontSize: '1em',
          }"
          class-name="w-full table-default"
          row-class-name="group h-5.5rem"
          row-key="id"
          height="72vh"
          :data="dataList"
          v-loading="isLoading"
          :disabled="isEdit"
          stripe
          empty-text="暂无数据">
          <!-- 选择 -->
          <el-table-column type="selection" fixed></el-table-column>
          <!-- ID -->
          <el-table-column label="用户ID" property="id" min-width="180%" column-key="id">
            <template #default="{ row }">
              <span
                v-copying.toast="row.id"
                block
                truncate
                class="w-10rem cursor-pointer truncate transition-300 hover:(text-[var(--el-color-info)] underline)"
                >{{ row.id }}</span
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
                    :src="row.avatar">
                    <template #error>
                      <small h-full w-full flex-row-c-c opacity-60 card-default> 未上传 </small>
                    </template>
                  </el-image>
                </div>
              </el-scrollbar>
            </template></el-table-column
          >
          <!-- 用户状态 -->
          <el-table-column label="用户状态" align="center" column-key="status" prop="status" width="180%">
            <template #default="{ row }">
              <el-switch
                v-model="row.status"
                active-text="正常"
                inactive-text="封禁"
                :before-change="() => beforeChange(row.id, row.status, row.status ? '封禁用户' : '改为正常')"
                class="mx-a transition-200 active:scale-90"
                style="--el-switch-on-color: var(--el-color-info); --el-switch-off-color: var(--el-color-error)"
                :active-value="1"
                :inactive-value="0"
                :disabled="row.id === userId">
              </el-switch> </template
          ></el-table-column>
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
                  @click.stop="preview(row)">
                  <i i-solar:eye-bold-duotone p-0.5em />
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template #footer>
        <el-pagination
          v-model:current-page="pageInfo.pageNo"
          background
          layout="prev, pager, next"
          :page-count="pageInfo.total" />
        <small
          >共<strong class="text-1rem text-[var(--el-color-primary)]">{{ pageInfo.total }}</strong
          >个用户</small
        >
      </template>
    </TableLayout>
    <!-- 用户信息查看 -->
    <el-dialog v-model="isShowForm" class="view-dialog" align-center draggable width="fit-content">
      <template #header>
        <h3 class="text-center">用户详情</h3>
      </template>
      <div class="relative w-80vw md:w-350px">
        <el-form
          ref="formRef"
          :rules="formRules"
          :model="formData"
          :disabled="isLoading || !isEdit"
          label-width="4em"
          label-position="left"
          class="p-4 md:p-6"
          hide-required-asterisk>
          <el-form-item prop="avatar">
            <div class="w-full flex-row-c-c">
              <el-image
                class="w-6rem h-6rem mr-4em rounded-1/2 mx-a flex-row-c-c flex-shrink-0 v-card"
                :src="formData?.avatar"
                fit="cover"
                :lazy="true"></el-image>
            </div>
          </el-form-item>
          <el-form-item v-if="formData.id" prop="id" label="用户ID">
            <CopyText :text="formData.id" />
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item prop="nickname" label="昵称">
            <el-input v-model="formData.nickname" placeholder="请填写用户昵称（1-40字符）" />
          </el-form-item>
          <!-- 用户名 -->
          <el-form-item prop="username" label="用户名">
            <el-input v-model="formData.username" placeholder="请填写用户名（6-30字符）" />
          </el-form-item>
          <!-- 密码 -->
          <el-form-item v-if="formData.password && isEdit" prop="password" label="密码">
            <el-input v-model="formData.username" placeholder="请填写用户名（6-30字符）" />
          </el-form-item>
          <!-- 性别 -->
          <el-form-item prop="gender" label="性别">
            <el-radio-group v-if="formData.gender" v-model="formData.gender" fit="var(--el-color-primary)" flex>
              <el-radio
                v-for="(item, index) in [Gender.BOY, Gender.GIRL, Gender.DEFAULT]"
                :key="index"
                :label="item"
                border />
            </el-radio-group>
          </el-form-item>
          <!-- 生日 -->
          <el-form-item label="生日" size="birthday">
            <el-date-picker v-model="formData.birthday" type="date" placeholder="选择出生年月日（选填）" class="w-full">
            </el-date-picker>
          </el-form-item>
          <div class="flex items-center gap-2">
            <!-- 状态 -->
            <el-form-item prop="status" label="状态">
              <el-switch
                v-model="formData.status"
                :active-value="1"
                :inactive-value="0"
                active-text="正常"
                inactive-text="封禁"
                class="mx-a transition-300 active:scale-90"
                style="--el-switch-on-color: var(--el-color-info); --el-switch-off-color: var(--el-color-error)"
                inline-prompt>
              </el-switch>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <template #footer>
        <el-button type="danger" plain @click="isShowForm = false && clearForm()">关闭</el-button>
        <el-button v-if="!isEdit && !formData?.id" type="info" plain @click="save">添加</el-button>
        <el-button :disabled="isEdit" v-else type="info" plain @click="save">保存修改</el-button>
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
