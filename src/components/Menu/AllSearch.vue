<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router/routes'

const isLoading = ref(false)
const searchWord = ref<string>('')
const getMenuList = ref<any[]>([])
/**
 * 路由跳转
 */
const router = useRouter()
async function toRouter(path?: string) {}
</script>

<template>
  <el-select
    v-model="searchWord"
    filterable
    prefix-icon="Search"
    :teleported="false"
    no-data-text="没有数据"
    :disabled="isLoading"
    clearable
    tyle="text"
    :popper-class="getMenuList.length === 0 ? 'animate-tada overflow-hidden' : 'overflow-hidden'"
    class="search"
    placeholder="搜索功能/菜单/帮助 ✨"
    @change="(url:string) => toRouter(url)">
    <template #prefix>
      <el-icon>
        <Search />
      </el-icon>
    </template>
    <el-option
      v-for="(p, i) in getMenuList"
      :key="p.url! + i"
      :label="p?.name"
      :value="p?.url"
      style="height: fit-content"
      @click="toRouter(p.url)">
      <div flex items-center p-1>
        {{ p?.name }}页面
        <span v-if="$route.path === p.url" class="ml-a text-[var(--el-color-info)]">
          {{ $route.path === p.url ? '当前' : '' }}
        </span>
      </div>
    </el-option>
    <template #empty>
      <div h-3rem text-center text-0.8rem leading-3rem opacity-90>找不到资源 🤯</div>
    </template>
  </el-select>
</template>

<style scoped lang="scss">
.search {
  :deep(.el-input__wrapper) {
    border-radius: 2rem;
    .el-input__inner {
      width: 12rem;
      opacity: 0.9;
      transition: width $transition-delay $animate-cubic-bount;
      &:focus,
      &:valid {
        opacity: 1;
        width: 16rem;
      }
    }
  }
  :deep(.el-popper) {
    border-radius: 0.75rem;
    .el-select-dropdown__item.hover {
      border-radius: 4px;
      transition: all calc($transition-delay / 2) $animate-cubic-bount;
      color: #fff;
      background-color: var(--el-color-primary);
    }
  }
}
</style>
