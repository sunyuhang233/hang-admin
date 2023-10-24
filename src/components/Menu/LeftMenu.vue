<script lang="ts" setup>
import { useStorage } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
// 是否折叠  本地状态
const isFold = useStorage<boolean>('jiwu_isFold', true)

// 长短折叠
const isCollapse = ref<boolean>(false)
const activeMenu = computed({
  get() {
    return route.path
  },
  set(val: string) {
    router.push(val)
  },
})

const asyncRoutes = [
  {
    path: '/home',
    name: '首页',
    icon: 'i-solar:home-2-outline',
    onIcon: 'i-solar:home-2-bold',
    component: () => import('@/views/IndexView.vue'),
    meta: {
      title: '首页',
      icon: 'home',
    },
  },
  {
    path: '/sys',
    name: '系统',
    icon: 'i-solar:laptop-outline',
    onIcon: 'i-solar:laptop-bold',
  },
  {
    name: '系统',
    icon: 'i-solar:laptop-outline',
    onIcon: 'i-solar:laptop-bold',
    component: null,
    meta: {
      title: '关于',
      icon: 'about',
    },
    children: [
      {
        path: '/about/team',
        name: '团队',
        component: null,
        meta: {
          title: '团队',
          icon: 'team',
        },
      },
      {
        path: '/about/join',
        name: '加入',
        component: null,
        meta: {
          title: '加入',
          icon: 'join',
        },
      },
    ],
  },
  {
    path: 'user',
    name: '用户',
    icon: 'i-solar:shield-user-broken',
    onIcon: 'i-solar:bill-list-bold-duotone',
    meta: {
      title: '用户',
      icon: 'i-solar:shield-user-broken',
      onIcon: 'i-solar:bill-list-bold-duotone',
    },
  },
]
</script>

<template>
  <div
    v-if="!isCollapse"
    class="fixed left-0 top-0 z-99 block h-100vh w-full animate-[0.6s_fade-in-left] opacity-80 backdrop-blur-20px sm:hidden v-card"
    @click="isCollapse = true" />
  <div
    px-4
    pt-1rem
    shadow-md
    md:shadow-none
    transition="all 300  cubic-bezier(0.61, 0.225, 0.195, 1.3)"
    class="group menu fixed z-999 h-full backdrop-blur-30 md:sticky md:block"
    :class="{ '-translate-x-full': isCollapse }">
    <el-scrollbar height="calc(100vh - 60px)">
      <!-- 顶部 -->
      <div class="w-full flex justify-end p-4 py-2 pt-0" @click="isFold = !isFold">
        <span cursor-pointer>
          <i class="i-solar:hamburger-menu-line-duotone" inline-block h-6 w-6 filter-drop-shadow />
        </span>
      </div>
      <el-divider style="margin: 1px 0" opacity-80 />
      <!-- 菜单 -->
      <el-menu
        class="menu-first"
        :router="true"
        :default-active="activeMenu"
        :class="{ 'is-fold': isFold }"
        :collapse="isFold">
        <!-- 递归生成菜单栏 -->
        <MenuLine v-for="data in asyncRoutes" :key="data.path" :data="data" />
      </el-menu>
    </el-scrollbar>
    <!-- 折叠隐藏 -->
    <el-tooltip :show-after="1000" :hide-after="0" :content="isCollapse ? '展开' : '收起'" placement="right">
      <div
        flex-row-c-c
        cursor-pointer
        rounded-r-6px
        opacity-100
        md:group-hover:opacity-100
        class="absolute bottom-4rem h-3rem w-1.4rem -right-1.4rem -z-1 -z-1"
        :class="isCollapse ? 'bg-[var(--el-color-primary)] opacity-100 text-white' : 'text-dark'"
        transition="all 300 cubic-bezier(0.61, 0.225, 0.195, 1.3)"
        @click="isCollapse = !isCollapse">
        <i
          i-solar:alt-arrow-left-bold
          class="p-2 opacity-80"
          transition="all 300  cubic-bezier(0.61, 0.225, 0.195, 1.3)"
          :class="{ 'rotate-180': isCollapse }" />
      </div>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
$rounded-default: 6px;
$el-base-level-padding: 10px;
.menu {
  height: calc(100vh - $top-nav-height);
  top: $top-nav-height;
  user-select: none;
  :deep(.el-scrollbar__thumb) {
    width: 0;
  }

  :deep(.el-menu) {
    background-color: transparent;
    &.menu-first {
      border: none;
      > .el-menu-item {
        margin: 0.6rem 0;
      }
    }
    &.el-menu--popup {
      padding: 10px;
    }
    // 二级
    .is-opened {
      border-radius: $rounded-default;
    }

    // 菜单单项
    .el-menu-item,
    .el-sub-menu__title {
      &.is-active {
        border: 1px solid var(--el-color-primary);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.2) 0px 1px 2px;
      }
      width: auto;
      height: 3.2rem;
      padding-top: 10px;
      padding-bottom: 10px;
      border-radius: $rounded-default;
      border: 1px dashed transparent;
      transition: 150ms;
      &:hover {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);
      }
    }

    &.el-menu--inline {
      transition-property: all;
      border-radius: $rounded-default $rounded-default;
      background-color: #81818118;
      backdrop-filter: blur(12px);
      box-shadow: inset rgba(22, 22, 22, 0.1) 0px 1px 3px, inset rgba(22, 22, 22, 0.2) 0px 1px 2px;
      .el-menu-item {
        width: 100%;
        font-size: 0.8rem;
        margin: 0 auto;
      }
    }

    .el-menu-item,
    .el-sub-menu {
      border: 1px dashed transparent;
      border-radius: $rounded-default;
    }
  }
}

:deep(.el-menu) {
  .el-menu-item.is-active {
    &,
    &:hover {
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
