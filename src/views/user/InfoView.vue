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

type Gender = undefined | null | '男' | '女' | '保密'

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

const updateTime = ref(useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value)

const isLoading = ref(false)

const isEdit = ref(false)

const userId = ref('123')

const pageInfo = reactive({
  pageNo: 1,
  pageSize: 10,
  total: 100,
})

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

interface MenuButtonType {
  title: string
  icon?: string | object | Array<string | object>
  type?: '' | 'default' | 'info' | 'text' | 'success' | 'warning' | 'primary' | 'danger'
  plain?: boolean
  show?: boolean
  methods?: () => any
}

const reload = () => {
  window.location.reload()
}
const exportUser = () => {
  console.log('导出')
}

const onShowInfoDetail = () => {
  isEdit.value = true
}

const selectList = ref([])

const menuList = ref<MenuButtonType[]>([
  {
    show: true,
    title: '导出',
    icon: 'i-solar:printer-outline',
    type: 'default',
    plain: false,
    methods: exportUser,
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
])

// 查询参数
const isShowSearch = ref<boolean>(true)
const searchDTO = ref({
  createTimeSort: undefined,
  isCustomer: undefined,
  keyWord: undefined,
  status: undefined,
  userId: undefined,
})

const loadData = () => {}

watch(
  [searchDTO, pageInfo],
  () => {
    loadData()
  },
  { immediate: true },
)

const resetDto = () => {
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
        <div class="ml-a flex"><TableDefaultBtns :menu="menuList" /></div>
      </template>
      <!-- 表格 -->
      <template #default>
        <el-table
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
  </div>
</template>

<style scoped></style>
