import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  // 404
  {
    path: '/notfound:msg',
    name: 'notfound',
    component: () => import('@/views/NotFound.vue'),
  },
  // notfound
  {
    path: '/:pathMath(.*)*',
    redirect: {
      path: '/notfound:404',
      replace: true,
    },
  },
]
