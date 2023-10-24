<script lang="ts" setup>
import { useLocalStorage } from '@vueuse/core'
interface MainTotalVO {
  ordersTotal?: OrdersTotal
  usersTotal?: UsersTotal
  goodsTotal?: GoodsTotal
  createTime?: string
  updateTime?: string
}

interface OrdersTotal {
  monthOrders: number
  monthRefundOrders: number
  monthSales: number
  monthDoneOrders: number
  monthAvgPrice: number
}

interface UsersTotal {
  allUsers: number
  monthNewUsers: number
}

interface GoodsTotal {
  allGoods: number
}

const total = ref<MainTotalVO>({})
const isToggle = useLocalStorage<boolean>('home_destotal_toggle', true)
const isLoading = ref<boolean>(false)
async function loadData() {
  total.value = {
    ordersTotal: {
      monthOrders: 100,
      monthRefundOrders: 100,
      monthSales: 100,
      monthDoneOrders: 100,
      monthAvgPrice: 100,
    },
    usersTotal: {
      allUsers: 100,
      monthNewUsers: 100,
    },
    goodsTotal: {
      allGoods: 100,
    },
    createTime: new Date().toString(),
    updateTime: new Date().toString(),
  }
}

loadData()

function getPercent(num = 0): number {
  if (num > 100) {
    num /= 10
    return getPercent(num)
  }
  return num
}
</script>

<template>
  <div
    v-loading="total.createTime && isLoading"
    class="group overflow-hidden"
  >
    <h3 class="flex items-end truncate">
      数据统计（{{ new Date().getMonth() + 1 }}月）
      <small
        hidden text-0.7rem opacity-60 md:inline
      >数据更新时间：{{ total.updateTime }}</small>
      <div class="ml-a flex-row-c-c opacity-0 transition-300 group-hover:opacity-100">
        <small
          mr-2 flex items-center text-0.8rem tracking-0.2em
        >
          统计图
          <el-switch
            v-model="isToggle"
            size="small"
            title=""
            class="ml-1"
          />
        </small>
        <ReloadBtn
          tip="刷新"
          type="smile"
          @reload="loadData"
        />
      </div>
    </h3>
    <section
      v-auto-animate="{
        duration: 300,
        easing: 'ease-in-out',
      }" relative
    >
      <div
        v-if="total.createTime && !isToggle"
        key="1"
        class="grid grid-(cols-2 gap-4) mt-2 mt-8 lg:grid-(cols-4 gap-6) md:grid-(cols-3 gap-8)"
      >
        <!-- 销售总量￥ -->
        <div class="grid-card flex-col justify-around">
          <small tracking-0.2em>销售总量￥</small>
          <div
            v-incre-up:1.4="total.ordersTotal?.monthSales"
            class="mt-2 text-1.7rem font-800 text-[var(--el-color-info)]"
          />
          <!-- 订单数 -->
          <small class="flex items-baseline text-0.8em tracking-0.2em">
            共<small
              v-incre-up.int="total.ordersTotal?.monthDoneOrders"
              class="text-1rem font-800"
            />
            单
          </small>
        </div>
        <!-- 用户总数 -->
        <div class="grid-card">
          <TotalProgress
            color="var(--el-color-success)"
            title="用户总数"
            :percentage="getPercent(total.usersTotal?.allUsers)"
            :count="total.usersTotal?.allUsers || 0"
            fix-count="人"
          />
        </div>
        <!-- 商品总数 -->
        <div class="grid-card">
          <TotalProgress
            color="var(--el-color-primary)"
            title="商品总数"
            :percentage="getPercent(total.goodsTotal?.allGoods)"
            :count="total.goodsTotal?.allGoods || 0"
            fix-count="个"
          />
        </div>
        <!-- 订单成交量 -->
        <div class="grid-card">
          <TotalProgress
            color="var(--el-color-primary)"
            title="成交量"
            :percentage="getPercent(total.ordersTotal?.monthDoneOrders)"
            :count="total.ordersTotal?.monthDoneOrders || 0"
            fix-count="单"
          />
        </div>
        <!-- 客单价￥ -->
        <div class="grid-card flex flex-col justify-center">
          <small tracking-0.2em> 平均客单价￥ </small>
          <h3


            v-incre-up="total.ordersTotal?.monthAvgPrice" mt-2 text-1.3rem
            font-800
          />
        </div>
        <!-- 新用户 -->
        <div class="grid-card">
          <TotalProgress
            color="var(--el-color-success)"
            title="新用户"
            :percentage="getPercent(total.usersTotal?.monthNewUsers)"
            :count="total.usersTotal?.monthNewUsers || 0"
            fix-count="人"
          />
        </div>
        <!-- 退单量 -->
        <div class="grid-card">
          <TotalProgress
            color="var(--el-color-error)"
            title="退单量"
            :percentage="getPercent(total.ordersTotal?.monthRefundOrders)"
            :count="total.ordersTotal?.monthRefundOrders || 0"
            fix-count="单"
          />
        </div>
      </div>
      <!-- 图表 -->
      <div
        v-else-if="total.createTime && isToggle"
        key="order_pie"
        grid="~ lg:cols-2 gap-6 "
        mt-4
      >
        <!-- 订单饼状图 -->
        <div
          key="2"
          class="flex-row-c-c border-transparent rounded-12px px-6 pt-6 border-default dark:border-1px"
        >
          <OrdersPie
            :data="total"
            chart-class="w-300px h-300px"
          />
        </div>
        <!-- 用户用户数 -->
        <div
          grid="~ cols-2 gap-6"
          class="border-transparent rounded-12px dark:border-1px"
        >
          <!-- 销售总量￥ -->
          <div class="grid-card flex flex-col justify-around">
            <small tracking-0.2em>销售总量￥</small>
            <div
              v-incre-up:1.4="total.ordersTotal?.monthSales"
              class="mt-2 text-1.7rem font-800 text-[var(--el-color-info)]"
            />
            <!-- 订单数 -->
            <small class="flex items-baseline text-0.8em tracking-0.2em">
              共<small
                v-incre-up.int="total.ordersTotal?.monthDoneOrders"
                class="text-1rem font-800"
              />
              单
            </small>
          </div>
          <!-- 商品总数 -->
          <div class="grid-card flex items-center">
            <TotalProgress
              :stroke-width="10"
              :whidth="70"
              color="var(--el-color-primary)"
              title="商品总数"
              :percentage="getPercent(total.usersTotal?.allUsers)"
              :count="total.usersTotal?.allUsers || 0"
              fix-count="人"
            />
          </div>
          <!-- 客单价 -->
          <div class="grid-card flex items-center">
            <TotalProgress
              :stroke-width="10"
              :whidth="70"
              color="var(--el-color-info)"
              title="客单价"
              :percentage="+getPercent(total.ordersTotal?.monthAvgPrice).toFixed(0)"
              :count="total.ordersTotal?.monthAvgPrice || 0"
              fix-count="元"
            />
          </div>
          <!-- 用户总数 -->
          <div class="grid-card flex items-center">
            <TotalProgress
              :stroke-width="10"
              :whidth="70"
              color="var(--el-color-error)"
              title="用户总数"
              :percentage="getPercent(total.usersTotal?.allUsers)"
              :count="total.usersTotal?.allUsers || 0"
              fix-count="人"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.grid-card {
  --at-apply:flex bg-light bg-opacity-20 dark:bg-dark-400 truncate border-default border-op-50 select-none rounded-12px p-4 px-6 hover:shadow-sm transition-200;
}
</style>
