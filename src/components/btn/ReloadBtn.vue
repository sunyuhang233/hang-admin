<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tip?: string
    type?: 'smile' | 'defalut'
  }>(),
  {
    type: 'defalut',
  },
)
defineEmits(['reload'])
</script>

<template>
  <el-tooltip :content="props.tip" placement="top">
    <!-- 刷新分为两种 -->
    <ElButton v-if="props.type === 'defalut'" class="btn" round @click="$emit('reload')">
      <span class="hidden overflow-hidden truncate md:inline">刷新</span>
      <i
        class="i-solar:refresh-outline w-1.4em h-1.4em cursor-pointer bg-[var(--el-color-info)] transition-300 hover:rotate-90 active:animate-spin" />
    </ElButton>
    <i
      v-else-if="props.type === 'smile'"
      class="i-solar:refresh-outline cursor-pointer bg-[var(--el-color-info)] p-0.5em transition-300 hover:rotate-90 active:animate-spin"
      alt="刷新"
      @click="$emit('reload')" />
  </el-tooltip>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0em 0.4em;
  transition: $transition-delay;

  span {
    width: 0;
    overflow: hidden;
    transition: $transition-delay;
    letter-spacing: 0.1em;
  }

  &:hover {
    span {
      width: 3em;
    }
  }
  &:hover span,
  &:focus span {
    width: 3em;
    margin: 0 0.4em;
  }
}
</style>
