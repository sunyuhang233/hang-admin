<script lang="ts" setup>
import { THEME_KEY } from 'vue-echarts'

import { useColorMode, useDateFormat, watchDebounced } from '@vueuse/core'

enum DateTimeType {
  DAY = 0,
  MONTH = 1,
  YEAR = 2,
}

//主题
provide(THEME_KEY, useColorMode())
const menu = [
  { label: '本日', value: DateTimeType.DAY },
  { label: '本月', value: DateTimeType.MONTH },
  { label: '本年', value: DateTimeType.YEAR },
]
const selectDate = ref()
const isLoading = ref(false)

const dateType = {
  day: {
    startTime: useDateFormat(Date.now(), 'YYYY-MM-DD 00:00:00').value,
    endTime: useDateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss').value,
  },
  month: {
    startTime: useDateFormat(new Date().setDate(1), 'YYYY-MM-DD 00:00:00').value,
    endTime: useDateFormat(Date.now(), 'YYYY-MM-DD 00:00:00').value,
  },
  year: {
    startTime: useDateFormat(new Date().setMonth(1), 'YYYY-MM-01 00:00:00').value,
    endTime: useDateFormat(Date.now(), 'YYYY-MM-DD 00:00:00').value,
  },
}
let timer: number | undefined = -1

// 参数
const dto = reactive<any>({
  // 默认月开始
  startTime: dateType.month.startTime,
  endTime: dateType.month.endTime,
  timeType: DateTimeType.MONTH,
})

function onChangeDate(val: Date[]) {
  if (val.length === 2) {
    dto.timeType = DateTimeType.MONTH
    dto.startTime = useDateFormat(val[0], 'YYYY-MM-DD 00:00:00').value
    dto.endTime = useDateFormat(val[1], 'YYYY-MM-DD 00:00:00').value
  }
}

// 数据
const infoList = ref<{
  walletIn: number[]
  walletOut: number[]
  pointIn: number[]
  pointOut: number[]
  timeList: string[]
} | null>({
  walletIn: [1, 3, 5, 6, 7, 8],
  walletOut: [1, 3, 5, 6, 7, 8],
  pointIn: [1, 3, 5, 6, 7, 8],
  pointOut: [1, 3, 5, 6, 7, 8],
  timeList: ['2023-10-14', '2023-10-15', '2023-10-16', '2023-10-17'],
})

// 请求
async function init() {}
// 筛选select
function onChangeType(res: DateTimeType) {}

watchDebounced(
  dto,
  () => {
    init()
  },
  { immediate: true, deep: true },
)
// echarts配置 图表数据
const option = ref({
  color: ['#67c23a', '#ff2323f6', '#', '#ff2323f6'],
  title: {
    textStyle: {
      fontFamily: 'Alimama',
    },
  },
  tooltip: { trigger: 'axis' },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    data: infoList?.value?.timeList,
  },
  yAxis: {
    name: '金额',
    type: 'value',
  },
  backgroundColor: 'transparent',
  dataZoom: { type: 'inside' },
  grid: {
    top: '20%',
    left: '14%',
    right: '6%',
    bottom: '8%',
    containLabel: false,
  },

  legend: {
    data: ['钱包收入', '钱包支出', '积分收入', '积分支出'],
    type: 'scroll',
    zlevel: '1',
    itemStyle: {
      borderCap: 'round',
      borderType: 'dashed',
    },
  },
  series: [
    {
      name: '钱包收入',
      data: infoList.value?.walletIn,
      type: 'bar',
      smooth: true,
      barWidth: '20%',
      showBackground: true,
      color: '#67c23a',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
    },
    {
      name: '钱包支出',
      data: infoList.value?.walletOut,
      type: 'bar',
      smooth: true,
      showBackground: true,
      barWidth: '20%',
      color: '#ff2323f6',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.1)',
      },
    },
    {
      name: '积分收入',
      data: infoList.value?.pointIn,
      type: 'line',
      smooth: true,
      color: '#85ff48',
      areaStyle: {
        opacity: 0.2,
      },
      stack: 'x',
    },
    {
      name: '积分支出',
      data: infoList.value?.pointOut,
      type: 'line',
      smooth: true,
      color: '#ff2323f6',
      areaStyle: {
        opacity: 0.2,
      },
      stack: 'x',
    },
  ],
})

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <div v-loading="isLoading" class="group overflow-hidden p-2">
    <div mb-2 flex-row-c-c justify-between>
      <h4>账单收支统计</h4>
      <div class="w-1/2 flex opacity-0 transition-200 group-hover:opacity-100">
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          range-separator="~"
          start-placeholder="开始"
          end-placeholder="结束"
          size="small"
          class="mr-2"
          @change="onChangeDate" />
        <SmallSelect :menu="menu" class="w-6rem flex-shrink-0 text-center" @change="onChangeType" />
      </div>
    </div>
    <section v-auto-animate class="h-320px min-h-320px flex-row-c-c p-2">
      <v-chart
        v-if="infoList?.timeList.length"
        key="infoList"
        :autoresize="{ throttle: 500 }"
        :option="option"
        class="h-full w-full" />
      <div
        v-else-if="!isLoading && infoList?.timeList.length === 0"
        key="small-empty"
        class="truncate text-center opacity-80">
        暂无数据
      </div>
    </section>
  </div>
</template>
