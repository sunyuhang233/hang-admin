<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()

const getNowStatus = computed(() => {
  return useNowDateText(new Date())
})

function useNowDateText(date: Date = new Date()): string {
  const hours = date.getHours()
  let res = ''
  if (hours > 0 && hours < 6) res = '😴'
  else if (hours < 12) res = '早上好 🏆'
  else if (hours === 12) res = '中午好 🍕'
  else if (hours > 12 && hours < 18) res = '下午好 ☕'
  else res = '晚上好 🌜'
  return res
}
</script>

<template>
  <div mb-4>
    <h3 mb-4>Hi {{ store.userInfo.username }},</h3>
    <h2 mb-2>欢迎回来，{{ getNowStatus }}</h2>
  </div>
</template>

<style scoped lang="scss"></style>
