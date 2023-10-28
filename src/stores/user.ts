import { userExit } from '@/api/auth'
import router from '@/router'
import { StatusCode, UserStatus } from '@/types'
import type { UserInfoVO } from '@/types/auth'
import { Gender } from '@/types/common'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'useUserStore',
  () => {
    const token = ref<string>('')
    const isLogin = ref<boolean>(false)

    //用户信息
    const userInfo = ref<UserInfoVO>({
      id: '',
      username: '',
      email: '',
      phone: '',
      nickname: '',
      gender: Gender.BOY,
      avatar: '',
      birthday: '',
      createTime: '',
      slogan: '',
      updateTime: '',
      lastLoginTime: '',
      status: UserStatus.UNABLE,
    })

    const onLogin = async (t: string) => {
      token.value = t
      isLogin.value = true
    }

    const clearData = async () => {
      const path = router.currentRoute.value.path
      token.value = ''
      isLogin.value = false
      return router.replace({
        path: '/login',
      })
    }

    const getToken = computed(() => {
      if (isLogin.value && token.value) {
        return token.value
      } else {
        clearData()
        return ''
      }
    })

    const exitLogin = () => {
      ElMessageBox.confirm('是否确认退出登录？', '退出登录', {
        confirmButtonText: '确认退出',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          // 退出登录
          const { data } = await userExit()
          if (data.code === StatusCode.SUCCESS) {
            clearData()
            ElNotification.success({
              title: '退出成功！',
            })
          } else {
            ElMessage.error('退出失败，请稍后重试！')
          }
        })
        .catch(() => {})
    }

    return {
      onLogin,
      token,
      userInfo,
      getToken,
      clearData,
      isLogin,
      exitLogin,
    }
  },
  {
    // 持久化
    persist: {
      storage: localStorage.getItem('jiwu_index_isAutoLogin') === 'true' ? localStorage : sessionStorage,
      // 恢复数据前
      beforeRestore: (ctx) => {
        if (localStorage.getItem('jiwu_index_isAutoLogin') !== 'true') localStorage.setItem(ctx.store.$id, '')
      },
    },
  },
)
