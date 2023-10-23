<script lang="ts" setup></script>

<template>
  <div
    relative h-100vh w-full flex-row-c-c overflow-hidden
    class="animate-[0.3s_fade-in_ease]"
  >
    <!-- 背景 -->
    <div class="bg h-120vw w-120vw md:h-50vw md:w-50vw" />
    <!-- 内容 -->
    <main class="group relative w-9/10 bg-white px-4 py-6 shadow md:w-800px dark:bg-dark-500 md:px-8 md:py-6">
      <!-- logo+nav -->
      <div class="min-h-3em flex-row-bt-c tracking-0.2em">
        <div class="flex-row-c-c">
          <img
            mr-2 h-1.6rem w-1.6rem object-cover
            src="@/assets/images/logo/logo.png"
            alt="Logo"
          >
          <small class="font-600 text-[var(--el-color-primary)]">极物圈</small>
        </div>
        <div class="right opacity-0 group-hover:opacity-70">
          <ThemeSwitch />
        </div>
      </div>
      <section class="flex-row-bt-c flex-wrap pb-10">
        <!-- 图片 -->
        <div class="imgs mb-6 flex-row-c-c flex-1 flex-col">
          <img
            class="mx-a my-6 w-1/2 md:w-12rem"
            object-cover
            dark:filter-invert-100
            src="@/assets/images/logo/kiwi_strong.svg"
            alt="bg 背景"
          >
          <strong tracking-0.4em>极物圈管理后台</strong>
        </div>
        <!-- 表单 -->
        <LoginForm class="mx-a px-6 md:mx-0" />
      </section>
    </main>
  </div>
</template>

<style scoped lang="scss">
.bg {
  position: absolute;
  background: radial-gradient(circle at top, #a252fd, #656fffad);
  z-index: -1;
  border-radius: 67% 33% 70% 30% / 30% 54% 46% 70%;
  animation: border-anima 20s ease-out infinite;
}

@keyframes border-anima {
  0% {
    transform: scale(1);
    border-radius: 67% 33% 70% 30% / 30% 54% 46% 70%;
  }
  25% {
    transform: scale(1.02);
    border-radius: 55% 45% 54% 46% / 42% 61% 39% 58%;
  }
  50% {
    transform: scale(0.98);
    border-radius: 70% 30% 71% 29% / 53% 70% 30% 47%;
  }
  75% {
    transform: scale(1.02);
    border-radius: 67% 33% 70% 30% / 30% 54% 46% 70%;
  }
  100% {
    transform: scale(1);
    border-radius: 67% 33% 70% 30% / 30% 54% 46% 70%;
  }
}
</style>
