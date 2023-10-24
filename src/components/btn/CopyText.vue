<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    pretext?: string
    icon?: string | boolean
    showIcon?: boolean
  }>(),
  {
    icon: 'i-solar:copy-bold-duotone',
    showIcon: true,
  },
)
</script>

<template>
  <div class="cursor-pointer transition-300 hover:text-[var(--el-color-info)]">
    <div inline>{{ pretext }}</div>
    <div v-copying.toast="text" ml-a inline style="font-size: inherit">
      {{ text }}
    </div>
    <i v-if="showIcon" class="ml-1 p-0.6em opacity-60" :class="icon"></i>
  </div>
</template>

<style scoped></style>
