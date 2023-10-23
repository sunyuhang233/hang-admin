<template>
  <div flex flex-col class="tracking-0.1em">
    <WelcomeCard />
    <!-- 主内容 -->
    <div grid="~ cols-1 gap-8 items-start" lg:grid="~ cols-[4fr_2fr]  gap-8 " mb-4 class="content">
      <!-- 左侧 -->
      <div class="left" grid="~ cols-1 gap-8">
         <!-- 订单数 -->
            <OrderTotal class="box-content" />
      </div>
      <!-- 右侧 -->
      <div grid="~ cols-1 gap-8 " class="right"></div>
    </div>
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
