<script lang="ts" setup>
// 订单状态参数
enum OrdersStatus {
  /** 待付款 */
  UN_PAID = 0,
  /** 已付款 */
  PAID = 1,
  /** 已发货 */
  DELIVERED = 2,
  /** 已收货 */
  RECEIVED = 3,
  /** 已评价 */
  COMMENTED = 4,
  /** 已取消 */
  CANCELED = 5,
  /** 已超时取消 */
  DELAY_CANCELED = 6,
  /** 发起退款 */
  REFUND = 7,
  /** 退款成功并取消 */
  REFUND_SUCCESS = 8,
}
// 存放数据
const orderTotalList = ref<any[]>([
  {
    title: '待发货',
    color: '#f56c6c',
    class: '',
    icon: 'el-icon-edit',
    nums: 10,
        status: OrdersStatus.PAID,
    
    },
   {
    title: '已发货',
    color: '#f56c6c',
    class: '',
    icon: 'el-icon-edit',
    nums: 10,
        status: OrdersStatus.DELIVERED,
  },
  {
    title: '超时取消',
    color: '#f56c6c',
    class: '',
    icon: 'el-icon-edit',
    nums: 10,
    status: OrdersStatus.DELAY_CANCELED,
  },
  {
    title: '待付款123',
    color: '#f56c6c',
    class: '',
    icon: 'el-icon-edit',
    nums: 10,
    status: OrdersStatus.REFUND_SUCCESS,
  },
])
// 初始化数据的方法
async function loadData() {
  console.log('order1', orderTotalList.value)
  const list = orderTotalList.value.map((item) => {
    return {
      ...item,
      ...getTitle(item.status),
    }
  })
  orderTotalList.value = list
}
loadData()

// 通过后端返回数据处理为前端渲染的格式
function getTitle(status?: OrdersStatus) {
  switch (status) {
    case OrdersStatus.UN_PAID:
      return {
        title: '待付款',
        color: '',
      }
    case OrdersStatus.PAID:
      return {
        title: '待发货',
        color: '#fff',
        class: 'relative text-#fff group bg-[var(--el-color-primary)] shadow ',
        icon: 'animate-[1s_shopcart-rote] p-1.4em i-solar:cart-large-2-bold-duotone left-1 bottom-0  z-0 opacity-40 -rotate-20',
      }
    case OrdersStatus.DELIVERED:
      return {
        title: '已发货',
        class: 'group',
        icon: 'opacity-0 scale-50 transition-all -translate-x-20px group-hover:(opacity-30 translate-x-0 scale-100  -rotate-20)   p-1.4em i-solar:scooter-bold-duotone left-1 bottom-1 z-0  ',
      }
    case OrdersStatus.RECEIVED:
      return {
        title: '已收货',
        color: '',
      }
    case OrdersStatus.COMMENTED:
      return {
        title: '已评价',
        color: '#fff',
        class: 'relative text-#fff shadow group bg-[var(--el-color-success)] ',
        icon: 'animate-[1s_shopcart-rote] p-1.4em i-solar:bag-check-bold left-1 bottom-0  z-0 opacity-40 -rotate-20',
      }
    case OrdersStatus.CANCELED:
      return {
        title: '已取消',
        class: 'group',
        icon: 'opacity-0 scale-50 transition-all -translate-x-20px group-hover:(opacity-20 translate-x-0 scale-100  -rotate-20) p-1.4em i-solar:cart-cross-bold-duotone left-1 bottom-1 z-0  ',
      }
    case OrdersStatus.DELAY_CANCELED:
      return {
        title: '超时取消',
        color: '',
        class: 'group',
        icon: 'opacity-0 scale-50 transition-all -translate-x-20px group-hover:(opacity-20 translate-x-0 scale-100  -rotate-20) p-1.4em i-solar:bag-cross-bold-duotone left-1 bottom-1 z-0  ',
      }
    case OrdersStatus.REFUND:
      return {
        title: '待退售后',
        color: '#fff',
        class: 'text-#fff bg-[var(--el-color-error)] opacity-90',
        icon: 'animate-zoom-in-left p-1.4em i-solar:bill-check-bold-duotone left-1 bottom-1  z-0 opacity-40 -rotate-20',
      }
    case OrdersStatus.REFUND_SUCCESS:
      return {
        title: '已退款',
        color: '',
        class: 'group',
        icon: 'opacity-0 scale-50 transition-all -translate-x-20px group-hover:(opacity-20 translate-x-0 -rotate-20 scale-100)   p-1.4em i-solar:banknote-2-broken left-1 bottom-1  z-0  ',
      }
    default:
      return {
        title: '待定',
        color: '',
      }
  }
}
const router = useRouter()
const routerChange = (status: number) => {
  router.push({
    path: '/orders/info',
    query: {
      status,
    },
  })
}
</script>

<template>
  <div>
    <el-scrollbar>
      <div class="flex select-none justify-between py-2px" min-h-5rem>
        <!-- 列表 -->
        <div
          v-for="p in orderTotalList"
          :key="p.status"
          class="relative mx-1 w-8rem flex-row-c-c flex-shrink-0 flex-col cursor-pointer overflow-hidden rounded-10px transition-200 lg:(mx-2 flex-1 p-2) active-(scale-97 shadow-md) hover-(shadow)"
          :class="p.class"
          @click="routerChange(p.status)">
          <span
            v-incre-up.int="p.nums"
            class="rounded-8px text-[var(--el-bg-color-primary)] dark:text-light"
            :style="{ color: p.color }"
            my-4
            text-1.4rem
            font-500 />
          <small truncate pb-2 text-center text-0.8rem font-600> {{ p.title }}</small>
          <i v-if="p.icon" absolute :class="p.icon" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss"></style>
