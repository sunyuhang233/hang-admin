<script lang="ts" setup>
const isShowSearch = ref<boolean>(false)
</script>

<template>
  <header z-1000 block w-full flex-row-bt-c class="header flex px-4 md:px-6">
    <div class="left flex cursor-pointer items-center">
      <router-link to="/" class="group relative">
        <img src="@/assets/images/logo/logo.png" alt="logo" block h-2.4rem w-2.4rem object-cover dark:hidden />
        <img src="@/assets/images/logo/logo_dark.png" alt="logo" hidden h-2.4rem w-2.4rem object-cover dark:block />
        <i
          i-solar:home-2-bold
          absolute
          left-0.4rem
          top-0.4rem
          p-0.8rem
          opacity-0
          transition-300
          group-hover:text-dark
          group-hover:opacity-100
          dark:group-hover:text-white />
      </router-link>
      <strong
        class="ml-3 hidden truncate font-600 tracking-0.2em transition-300 md:block hover:text-[--el-color-primary]"
        >极物圈后台</strong
      >
      <!-- 搜索 -->
      <div ml-4 flex items-center md:ml-16>
        <AllSearch class="hidden md:block" />
        <div class="block md:hidden">
          <el-button icon="search" circle style="padding: 0.6em" @click="isShowSearch = !isShowSearch" />
        </div>
      </div>
    </div>
    <div class="right flex-row-c-c">
      <!-- 消息 -->
      <BellBtn />
      <!-- 退出登录 -->
      <el-button round style="padding: 0.5em">
        <i i-solar:power-bold p-0.5em />
      </el-button>
      <!-- 夜间 -->
      <ThemeSwitch />
      <!-- 用户头像 -->
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  height: $top-nav-height;
}
</style>
