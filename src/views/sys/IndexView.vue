<script setup lang="ts">
const activeType = ref('redis')
</script>

<template>
  <div class="~ grid grid-cols-1 gap-6">
    <h3>系统管理</h3>
    <div class="p-4 table-default md:p-6">
      <el-tabs v-model="activeType" type="card">
        <el-tab-pane label="Redis管理" name="redis" lazy>
          <RedisManager />
        </el-tab-pane>
        <el-tab-pane label="权限初始化" name="permission" lazy>
          <PermissionManager />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped></style>
