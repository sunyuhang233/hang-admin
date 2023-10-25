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
])

const updateTime = ref(useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value)

const isLoading = ref(false)

const isEdit = ref(false)

const userId = ref('123')

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
</script>

<template>
  <div>
    <TableLayout :header="{ title: `用户管理`, updateTime }">
      <!-- 菜单 -->
      <template #menu>123</template>
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
    </TableLayout>
  </div>
</template>

<style scoped></style>
