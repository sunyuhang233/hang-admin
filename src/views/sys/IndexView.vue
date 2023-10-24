<script lang="ts" setup>
const active = ref('redis')
</script>

<template>
  <div grid="~ cols-1 gap-6">
    <h3>系统状态</h3>
    <!-- 管理 -->
    <div class="p-4 table-default md:p-6">
      <el-tabs v-model="active">
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

<style scoped lang="scss"></style>
