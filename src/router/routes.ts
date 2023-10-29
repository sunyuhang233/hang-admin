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
      {
        path: 'sys',
        name: 'sys',
        component: () => import('@/views/sys/IndexView.vue'),
        meta: {
          url: '/sys',
          title: '系统',
          icon: 'i-solar:laptop-outline',
          onIcon: 'i-solar:laptop-bold',
        },
      },
      /** ------------------ 用户管理 ---------------- */
      {
        path: 'user',
        meta: {
          title: '用户',
          icon: 'i-solar:shield-user-broken',
          onIcon: 'i-solar:bill-list-bold-duotone',
        },
        children: [
          {
            path: 'info',
            name: 'userInfo',
            component: () => import('@/views/user/InfoView.vue'),
            meta: {
              url: '/user/info',
              title: '用户列表',
              icon: 'i-solar:user-broken',
              onIcon: 'i-solar:user-bold',
            },
          },
          {
            path: 'role',
            name: 'userRole',
            component: () => import('@/views/user/RoleView.vue'),
            meta: {
              url: '/user/role',
              title: '角色列表',
              icon: 'i-solar:users-group-rounded-broken',
              onIcon: 'i-solar:users-group-rounded-bold-duotone',
            },
          },
        ],
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
