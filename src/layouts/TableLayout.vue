<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'

interface MenuButtonType {
  title: string
  icon?: string | object | Array<string | object>
  type?: '' | 'default' | 'info' | 'text' | 'success' | 'warning' | 'primary' | 'danger'
  plain?: boolean
  show?: boolean
  methods?: () => any
}

const props = withDefaults(
  defineProps<{
    header?: {
      title: string
      updateTime?: string
    }
    menuRihght?: MenuButtonType[]
  }>(),
  {
    header: () => ({
      title: '管理',
      updateTime: useDateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss').value,
    }),
  },
)

const route = useRoute()
</script>

<template>
  <div class="~ grid grid-cols-1 gap-6">
    <!-- 头部 -->
    <slot name="header">
      <h3>
        <i :class="$route?.meta?.onIcon" mr-2 p-0.6em></i>
        {{ props.header?.title || '管理' }}
        <small v-show="header.updateTime" text-0.8rem font-500 opacity-60
          >(最后更新:{{ props.header?.updateTime }})</small
        >
      </h3>
    </slot>
    <div class="~ grid grid-cols-1 gap-6">
      <!-- 菜单 -->
      <el-scrollbar view-class="menu flex items-center">
        <slot name="menu" />
      </el-scrollbar>
      <!-- 表格 -->
      <main>
        <slot name="default" />
      </main>
    </div>
    <!-- 底部 -->
    <footer class="flex items-center flex-row-bt-c">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style scoped></style>
