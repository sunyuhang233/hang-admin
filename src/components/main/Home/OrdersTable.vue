<script lang="ts" setup>
import { THEME_KEY } from 'vue-echarts'
import { useColorMode, useDateFormat, watchDebounced } from '@vueuse/core'

const isLoading = ref(false)
enum DateTimeType {
  DAY = 0,
  MONTH = 1,
  YEAR = 2,
}
// 主题
provide(THEME_KEY, useColorMode())
const menu = [
  { label: '本日', value: DateTimeType.DAY },
  { label: '本月', value: DateTimeType.MONTH },
  { label: '本年', value: DateTimeType.YEAR },
]
// 数据
const infoList = ref<any[]>([])

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
let timer: number | undefined

// 参数
const dto = reactive<any>({
  // 默认月开始
  startTime: dateType.month.startTime,
  endTime: dateType.month.endTime,
  timeType: DateTimeType.MONTH,
})
// 请求
async function init() {
  infoList.value = [
    {
      ordersAmount: 100,
      salesAmount: 200,
      time: '2021-08-01 00:00:00',
    },
    {
      ordersAmount: 100,
      salesAmount: 200,
      time: '2021-08-01 00:00:00',
    },
    {
      ordersAmount: 100,
      salesAmount: 200,
      time: '2021-08-01 00:00:00',
    },
  ]
}
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
  color: ['#0bdb85', '#fc2929'],
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
    boundaryGap: false,
    type: 'category',
    data: computed(() => infoList.value?.map((p) => p.time)),
  },
  yAxis: {
    name: '金额（￥）',
    type: 'value',
  },
  backgroundColor: 'transparent',
  dataZoom: { type: 'inside' },
  grid: {
    top: '16%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    containLabel: false,
  },
  legend: {
    data: ['订单量', '销售额'],
  },
  series: [
    {
      name: '订单量',
      data: computed(() => infoList.value?.map((p) => p.ordersAmount)),
      type: 'line',
      smooth: true,
      // areaStyle: {
      //   opacity: 0.8,
      //   color: new graphic.LinearGradient(0, 0, 0, 1, [
      //     {
      //       offset: 0,
      //       color: "rgba(11, 219, 133,0.5)",
      //     },
      //     {
      //       offset: 1,
      //       color: "rgba(22, 219, 133,0.1)",
      //     },
      //   ]),
      // },
      stack: 'x',
    },
    {
      name: '销售额',
      data: computed(() => infoList.value?.map((p) => p.salesAmount)),
      type: 'line',
      // areaStyle: {
      //   opacity: 0.8,
      //   color: new graphic.LinearGradient(0, 0, 0, 1, [
      //     {
      //       offset: 0,
      //       color: "rgba(252, 41, 41,0.4)",
      //     },
      //     {
      //       offset: 1,
      //       color: "rgba(252, 41, 41,0.1)",
      //     },
      //   ]),
      // },
      smooth: true,
      stack: 'x',
    },
  ],
})

onUnmounted(() => {
  timer && clearInterval(timer)
})
</script>

<template>
  <div v-loading="isLoading" class="group overflow-hidden">
    <div mb-2 flex-row-c-c justify-between>
      <h4>订单统计</h4>
      <!-- 日期 -->
      <div class="opacity-0 transition-200 group-hover:opacity-100">
        <SmallSelect :menu="menu" class="w-6em text-center" @change="onChangeType" />
      </div>
    </div>
    <section v-auto-animate class="min-h-320px w-full flex-row-c-c p-2">
      <v-chart
        v-if="infoList.length > 0"
        key="infoList"
        :autoresize="{ throttle: 500 }"
        :option="option"
        class="h-300px w-full" />
      <div v-else-if="!isLoading && infoList.length === 0" key="small-empty" class="truncate text-center opacity-80">
        暂无数据
      </div>
    </section>
  </div>
</template>
