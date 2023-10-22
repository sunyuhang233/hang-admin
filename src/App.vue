<script setup lang="ts">
// 初次加载动画
onMounted(() => {
  const dom = document.querySelector<HTMLDivElement>('#first-app-loading')
  if (dom) {
    dom.style.opacity = '0'
    setTimeout(() => {
      dom.style.display = 'none'
    }, 300)
  }
})
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="String(route.meta.firstTransition || '') || ''" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>
