<script lang="ts" setup>
function message(code: string | number): string {
  let msg: string
  switch (+code) {
    case 401:
      msg = '您没有权限访问此页面! ❌'
      break
    default:
      msg = '页面没有找到! ❌'
      break
  }
  return msg
}
</script>

<template>
  <div h-100vh w-full flex-row-c-c flex-col>
    <h3>{{ message(String($route.params?.msg) || '404') }}</h3>
    <div class="mt-4">
      <el-button @click="$route.redirectedFrom?.path ? $router.back() : $router.replace('/')"> 返回 </el-button>
      <el-button type="primary" rounded-4px border-default>
        <router-link to="/"> 首页 </router-link>
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
