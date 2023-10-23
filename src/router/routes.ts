import type { RouteRecordRaw } from 'vue-router'
import Layouts from '@/layouts/index.vue'
export const asyncRoutes: RouteRecordRaw[] = [
  {
    // 主页
    path: '/',
    redirect: '/home',
    component: Layouts,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/IndexView.vue'),
        meta: {
          url: '/home',
          title: '首页',
          icon: 'i-solar:home-2-outline',
          onIcon: 'i-solar:home-2-bold',
          first: true,
        },
      },
    ],
  },
]
export const routes: RouteRecordRaw[] = [
  {
    // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  ...asyncRoutes,
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
