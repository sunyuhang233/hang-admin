<script lang="ts" setup>
import { ElMenuItem, ElSubMenu } from 'element-plus'

const { data } = defineProps<{
  data: any
}>()

</script>

<template>
  <!-- 一级组件 -->
  <component :is="data.children?.length ? ElSubMenu : ElMenuItem" :index="data.path || data?.icon">
    <!-- 无儿子 -->
    <i
      v-if="data.icon && !data.children?.length"
      class="transition-200"
      :class="$route.path === data.url ? data?.onIcon : data.icon"
      filter-drop-shadows
      p-0.8em />
    <el-image
      v-else-if="data.image && !data.children?.length"
      :src="data.image"
      loading="lazy"
      :alt="data.meta.title"
      class="h-0.8em w-0.8em"
      fit="cover"
      style="border-radius: 6px; overflow: hidden" />
    <template #title>
      <div v-if="data.children?.length">
        <i
          v-if="data.icon"
          class="transition-100"
          :class="$route.path === data.url ? data?.onIcon : data.icon"
          p-0.8em
          filter-drop-shadow />
        <el-image
          v-else-if="data.image"
          :src="data.image"
          loading="lazy"
          :alt="data.title"
          class="h-0.8em w-0.8em"
          fit="cover"
          style="border-radius: 6px; overflow: hidden" />
      </div>
      <span class="min-w-6rem animate-[fade-in] truncate text-center tracking-0.4em">{{ data.name }}</span>
    </template>
    <MenuLine v-for="child in data.children" :key="child.url" :data="child" />
  </component>
</template>

<style scoped lang="scss"></style>
