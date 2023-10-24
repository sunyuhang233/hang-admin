<script lang="ts" setup>
enum DateTimeType {
  DAY = 0,
  MONTH = 1,
  YEAR = 2,
}
const props = withDefaults(
  defineProps<{
    menu?: SelectType[]
  }>(),
  {
    menu: () => [
      { label: '按日', value: 0 },
      { label: '按月', value: 1 },
      { label: '按年', value: 2 },
    ],
  },
)
defineEmits(['change'])
const value = ref<any>(DateTimeType.MONTH)
interface SelectType {
  label: string
  value: number
}
defineExpose({
  value,
})
</script>

<template>
  <el-select
    v-model="value"
    placeholder="筛选"
    size="small"
    no-data-text="没有数据"
    class="opacity-90"
    @change="$emit('change', $event)">
    <el-option v-for="p in props.menu" :key="p.value" :label="p.label" :value="p.value" />
  </el-select>
</template>

<style scoped lang="scss"></style>
