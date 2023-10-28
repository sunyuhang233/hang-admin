import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
import { StatusCode } from '@/types'

export const BaseUrl = '/api'
// 图片
export const BaseUrlImg = `${BaseUrl}/res/`
export const BaseUrlVideo = `${BaseUrl}/res/`
export const BaseUrlFile = `${BaseUrl}/res/`
export const AuthKey = 'Authorization'
export const useHttp = axios.create({
  baseURL: BaseUrl, // 基础请求地址
  timeout: 10000, // 请求超时设置
  withCredentials: false, // 跨域请求是否需要携带 cookie
}) // 创建请求拦截
useHttp.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// 创建响应拦截
useHttp.interceptors.response.use(
  (res) => {
    const data = res.data
    let msg = ''
    const type = 'error'
    switch (data.code) {
      case StatusCode.UNAUTHORIZED:
        msg = '还未授权，不能访问'
        break
      case StatusCode.FORBIDDEN:
        msg = '没有权限，禁止访问'
        break
      case StatusCode.INTERNAL_SERVER_ERROR:
        msg = '服务器异常，请稍后再试'
    }
    if (msg !== '') {
      // 组件
      ElMessage.closeAll('error')
      ElMessage.error({
        grouping: true,
        type,
        message: data.message.length > 40 ? msg : data.message,
      })
    }
    // 代码块
    return res
  },
  (error) => {
    ElMessageBox.close()
    ElMessageBox.alert('网络连接失败，请稍后重试！', '错误', {
      confirmButtonText: '刷新',
      callback: (action: string) => {
        if (action === 'confirm') location.reload()
      },
    })
    return Promise.reject(error)
  },
)
