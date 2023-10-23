import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
enum StatusCode {
  SUCCESS = 20000,
  INSERT_ERR = 20001,
  DELETE_ERR = 20002,
  SELECT_ERR = 20003,
  UPDATE_ERR = 20004,
  LINK_NULL_ERR = 20005,
  NULL_ERR = 40001,
  TOKEN_ERR = 40002,
  PARAM_ERR = 40003,
  BUSY_ERR = 40004,
  DEFAULT_ERR = 40005,
  PERMISSION_ERR = 40006,
  TOKEN_EXPIRED_ERR = 40007,
}


export const BaseUrl = 'http://localhost:9090/'
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
      case StatusCode.INSERT_ERR:
        msg = '错误，添加失败！'
        break
      case StatusCode.DELETE_ERR:
        msg = '该目标已不存在！'
        break
      case StatusCode.UPDATE_ERR:
        msg = '错误，修改失败！'
        break
      case StatusCode.LINK_NULL_ERR:
        msg = '关联的内容不存在！'
        break
      case StatusCode.NULL_ERR:
        msg = '请求失败，空值错误！'
        break
      case StatusCode.TOKEN_ERR:
        msg = '身份验证失败！'
        router.push({ name: 'login' })
        break
      case StatusCode.TOKEN_EXPIRED_ERR:
        msg = '身份过期，请重新请求！'
        break
      case StatusCode.PERMISSION_ERR:
        msg = '抱歉，权限不足！'
        break
      case StatusCode.PARAM_ERR:
        msg = '请求失败，参数错误！'
        break
      case StatusCode.BUSY_ERR:
        msg = '服务器繁忙，请稍后重试！'
        break
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
