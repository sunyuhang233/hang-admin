<script setup lang="ts">
const onClearCache = () => {
  ElMessageBox.confirm('是否清空当前用户权限，会导致权限丢失？', '清空提示', {
    confirmButtonText: '确认',
    confirmButtonClass: 'el-button--danger',
    cancelButtonText: '取消',
    center: true,
    type: 'error',
  })
    .then(() => {
      ElMessage.success('清空成功')
    })
    .catch(() => {
      ElMessage.info('已取消')
    })
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h3>权限</h3>
    <el-button type="danger" plain class="ml-a" @click="onClearCache"> 清空权限 </el-button>
  </div>
</template>

<style scoped></style>
