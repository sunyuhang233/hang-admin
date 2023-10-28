import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // 1->2动画
  if (to.meta.first && from.meta.first) to.meta.firstTransition = 'fade'
  else to.meta.firstTransition = ''

  const user = useUserStore()
  const whitePathList = ['/login']
  const token = user.getToken

  if (to.path === '/login') {
    next()
  }

  if (!token && !whitePathList.includes(to.path)) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    })
  }

  if (token && to.path === '/login') {
    next({
      path: from.path,
    })
  }

  next()

  document.title = to.meta.title ? `极物圈后台 - ${to.meta.title?.toString()}` : document.title
})

export default router
