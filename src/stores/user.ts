import router from '@/router'
import { Gender, UserStatus } from '@/types'
import type { UserInfoVO } from '@/types/auth'
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
      gender: Gender.MALE,
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
      if (isLogin && token.value) {
        return token.value
      } else {
        clearData()
        return ''
      }
    })
    return {
      onLogin,
      token,
      userInfo,
      getToken,
      clearData,
      isLogin,
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
