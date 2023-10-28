<script lang="ts" setup>
import { userLogin } from '@/api/auth'
import { useUserStore } from '@/stores/user'
import { StatusCode } from '@/types'
import { useDateFormat, useLocalStorage } from '@vueuse/core'

const router = useRouter()
const store = useUserStore()
const isLoading = ref<boolean>(false)
// 表单
const userForm = reactive({
  username: '', // 用户名
  password: '', // 密码
})
const rules = reactive({
  username: [
    { required: true, message: '账号不能为空！', trigger: 'blur' },
    { min: 5, max: 30, message: '长度在5-30个字符！', trigger: 'blur' },
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
const isAutoLogin = useLocalStorage('jiwu_index_isAutoLogin', false)
const formRef = ref()
const route = useRoute()
/**
 * 登录
 * @param type
 */
async function onLogin(formEl: any | undefined) {
  if (!formEl || isLoading.value) return
  formEl.validate(async (valid: boolean) => {
    if (!valid) return
    isLoading.value = true
    const { data } = await userLogin(userForm)
    if (data.code === StatusCode.SUCCESS) {
      if (data.data.token != '') {
        store.onLogin(data.data.token)
        ElNotification.success({
          title: '登录成功！',
          message: useDateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss').value,
        })
        router.push(route?.query?.redirect?.toString() || '/')
      } else {
        ElMessage.closeAll('error')
        ElNotification.error({
          message: data.msg || '登录失败，请稍后再试！',
          duration: 5000,
        })
        // store
        store.$patch({
          token: '',
          isLogin: false,
        })
      }
    } else {
      ElMessage.closeAll('error')
      ElNotification.error({
        message: data.msg || '登录失败，请稍后再试！',
        duration: 5000,
      })
      // store
      store.$patch({
        token: '',
        isLogin: false,
      })
    }
    isLoading.value = false
  })
}

onMounted(() => {
  if (store.isLogin) {
    isLoading.value = true
    setTimeout(() => {
      router.push('/')
    }, 300)
  } else {
    store.clearData()
  }
})

const getToken = computed(() => '12')
</script>

<template>
  <el-form
    ref="formRef"
    v-loading.fullscreen="isLoading"
    :disabled="isLoading"
    :element-loading-text="getToken ? '自动登录中...' : '登录中'"
    label-position="top"
    hide-required-asterisk
    :rules="rules"
    :model="userForm"
    class="form w-94vw sm:w-400px">
    <h2 mb-5 text-center tracking-0.2em>登 录</h2>
    <!-- 密码登录 -->
    <el-form-item label="" prop="username" class="animated">
      <el-input
        v-model.trim="userForm.username"
        prefix-icon="user"
        size="large"
        placeholder="请输入用户名、手机号或邮箱"
        @keyup.enter="onLogin(formRef)" />
    </el-form-item>
    <el-form-item type="password" label="" prop="password" class="animated">
      <el-input
        v-model.trim="userForm.password"
        prefix-icon="Lock"
        size="large"
        placeholder="请输入密码"
        type="password"
        @keyup.enter="onLogin(formRef)" />
    </el-form-item>
    <el-form-item label="">
      <el-checkbox v-model="isAutoLogin"> 自动登录 </el-checkbox>
    </el-form-item>
    <el-form-item mt-1em>
      <el-button
        type="primary"
        class="submit w-full"
        :loading="isLoading"
        style="padding: 20px"
        @keyup.enter="onLogin(formRef)"
        @click="onLogin(formRef)">
        登 录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
.form {
  display: block;
  padding: 2.5em 3em 2em 3em;
  backdrop-filter: blur(5px);
  overflow: hidden;
  animation-delay: 0.1s;
  border-radius: 12px;
  :deep(.el-input__wrapper) {
    padding: 0.3em 1em;
  }

  // 报错信息
  :deep(.el-form-item) {
    padding: 0.2em;

    .el-form-item__error {
      padding-top: 0.2em;
    }
  }
}

:deep(.el-button) {
  padding: 0.3em 1em;
}
// label总体
:deep(.el-form-item) {
  margin-bottom: 14px;
}

.dark .active {
  background-color: var(--el-color-primary);
}

.submit {
  font-size: 1.2em;
  font-weight: 800;
  transition: 0.3s;
  cursor: pointer;

  :deep(.el-input__wrapper) {
    background-color: var(--el-color-primary);
    cursor: pointer;

    * {
      color: #fff;
      font-weight: 800;
      letter-spacing: 0.4em;
    }
  }

  .dark:deep(.el-input__wrapper) {
    background-color: var(--el-color-primary);
    cursor: pointer;
    color: #fff;
  }
}
</style>
