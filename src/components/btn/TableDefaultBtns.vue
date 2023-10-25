<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    menu: MenuButtonType[]
  }>(),
  {
    menu: () => [
      { show: true, title: '导出', icon: 'i-solar:printer-outline mr-2 p-0.5em', type: 'default', plain: false },
      { show: true, title: '筛选', icon: 'i-solar:sort-from-top-to-bottom-outline', type: 'default' },
      { show: true, title: '刷新', icon: 'i-solar:refresh-outline', type: 'info' },
    ],
  },
)

interface MenuButtonType {
  title: string
  icon?: string | object | Array<string | object>
  type?: '' | 'default' | 'info' | 'text' | 'success' | 'warning' | 'primary' | 'danger'
  plain?: boolean
  show?: boolean
  methods?: () => any
}

const menuList = computed(() => props.menu.filter((item) => item.show))
</script>

<template>
  <el-button
    v-for="p in menuList"
    :key="p.title"
    class="group ml-12px w-full tracking-0.2em transition-300 md:ml-0 md:w-auto"
    :plain="p.plain !== undefined ? p.plain : true"
    :type="p.type"
    @click="() => p.methods && p.methods()"></el-button>
</template>

<style scoped></style>
