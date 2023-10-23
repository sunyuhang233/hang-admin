<template>
  <div flex flex-col class="tracking-0.1em">
    <WelcomeCard />
     <!-- 主内容 -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box-content {
  --at-apply: 'v-card p-4  md:p-6 bg-white dark:bg-dark-5 rounded-3 shadow-sm';
  box-shadow: #8585851a 0px 1px 3px, rgba(128, 128, 128, 0.1) 0px 1px 2px;
}
.left :deep(.el-scrollbar__thumb) {
  display: none;
}
</style>
