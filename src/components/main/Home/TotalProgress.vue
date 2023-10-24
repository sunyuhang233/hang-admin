<template>
  <div flex items-center leading-1.8em>
    <el-progress
      class="cursor-pointer hover:scale-110 transition-200"
      type="circle"
      :width="whidth || 70"
      :striped="true"
      :striped-flow="true"
      :stroke-width="strokeWidth || 8"
      :indeterminate="true"
      :color="color || 'var(--el-color-primary)'"
      :percentage="percentage || 0" />

    <div class="truncate w-full flex flex-col pl-3">
      <small tracking-0.2em opacity-80>{{ title }}</small>
      <!-- 数量 -->
      <strong>
        {{ count }}<small text-0.7em opacity-80 v-show="fixCount">{{ fixCount }}</small>
      </strong>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  color: string
  percentage: number
  whidth?: number
  strokeWidth?: number
  title?: string
  count: string | number
  fixCount?: string
  incre?: boolean
}>()
</script>
<style scoped lang="scss">
:deep(.el-progress__text) {
  font-size: 1em !important;
}
</style>
