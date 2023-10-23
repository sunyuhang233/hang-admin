<script lang="ts" setup></script>

<template>
  <el-popover placement="bottom" :width="300" trigger="click">
    <template #reference>
      <i
        i-solar:bell-broken
        mr-4
        class="mr-2 p-0.5em transition-300 hover:(i-solar:bell-bold animate-swing bg-[--el-color-info])" />
    </template>
    <div>
      <small text-center>暂无消息</small>
    </div>
  </el-popover>
</template>

<style scoped lang="scss"></style>
