<script lang="ts" setup>
import currency from 'currency.js'
const isLoading = ref<boolean>(false) // 商品列表
const goodsList = ref<any[]>([])
// 分页器
const page = ref<number>(0)
const size = ref<number>(10)
// 查询页信息
const pageInfo = reactive({
  total: -1,
  pages: -1,
  current: -1,
})
const noMore = computed(() => {
  return pageInfo.current !== -1 && pageInfo.current === pageInfo.pages
})

async function loadData() {
  goodsList.value = [
    {
      id: 1,
      name: '商品名称',
      price: 100,
      costPrice: 100,
      stock: 100,
      sales: 100,
      views: 100,
      createTime: '2021-08-08 12:12:12',
      updateTime: '2021-08-08 12:12:12',
      images: 'https://img.zcool.cn/community/01811f5abc92fda801218207a45ce8.JPG@1280w_1l_2o_100sh.jpg',
    },
    {
      id: 1,
      name: '商品名称',
      price: 100,
      costPrice: 100,
      stock: 100,
      sales: 100,
      views: 100,
      createTime: '2021-08-08 12:12:12',
      updateTime: '2021-08-08 12:12:12',
      images: 'https://img.zcool.cn/community/01739d5ac18a1ca8012182079ee088.JPG@1280w_1l_2o_100sh.jpg',
    },
    {
      id: 1,
      name: '商品名称',
      price: 100,
      costPrice: 100,
      stock: 100,
      sales: 100,
      views: 100,
      createTime: '2021-08-08 12:12:12',
      updateTime: '2021-08-08 12:12:12',
      images: 'https://img.zcool.cn/community/01739d5ac18a1ca8012182079ee088.JPG@1280w_1l_2o_100sh.jpg',
    },
    {
      id: 1,
      name: '商品名称',
      price: 100,
      costPrice: 100,
      stock: 100,
      sales: 100,
      views: 100,
      createTime: '2021-08-08 12:12:12',
      updateTime: '2021-08-08 12:12:12',
      images: 'https://img.zcool.cn/community/01739d5ac18a1ca8012182079ee088.JPG@1280w_1l_2o_100sh.jpg',
    },
    {
      id: 1,
      name: '商品名称',
      price: 100,
      costPrice: 100,
      stock: 100,
      sales: 100,
      views: 100,
      createTime: '2021-08-08 12:12:12',
      updateTime: '2021-08-08 12:12:12',
      images: 'https://img.zcool.cn/community/01739d5ac18a1ca8012182079ee088.JPG@1280w_1l_2o_100sh.jpg',
    },
  ]
}

loadData()

/**
 * 计算每一行的样式
 */
function tableRowClassName({ row, rowIndex }: { row: any; rowIndex: number }): string {
  if (rowIndex === 0) return 'text-[var(--el-color-primary)] font-700 dark:text-[var(--el-color-info)]'
  else if (rowIndex === 1) return 'text-[var(--el-color-primary)] font-700 dark:text-[var(--el-color-info)] opacity-80'
  else if (rowIndex === 2) return 'text-[var(--el-color-primary)] font-700 dark:text-[var(--el-color-info)] opacity-70'
  return 'group'
}

// 单例
const buttonRef = ref()
const tooltipRef = ref()
const tooltipTitle = ref()
const isShowToolTip = ref(false)
function onTipOver(e: MouseEvent, val: string) {
  isShowToolTip.value = true
  buttonRef.value = e.currentTarget
  tooltipTitle.value = val
}
</script>

<template>
  <div v-auto-animate @mouseout="isShowToolTip = false">
    <h3>
      热卖商品<small v-show="pageInfo.total > 0">（共{{ pageInfo.total }}件）</small>
    </h3>
    <el-table
      v-if="goodsList.length"
      empty-text="暂无数据"
      header-cell-class-name="h-3rem shadow shadow-inset md:shadow-none"
      :max-height="500"
      width="fit-content"
      class-name="mt-4 table-default"
      :data="goodsList"
      :row-class-name="tableRowClassName"
      header-align="center">
      <el-table-column type="index" header-align="center" width="100%" label="排名" align="center" />
      <el-table-column prop="name" label="商品" header-align="center">
        <template #default="{ row }">
          <div class="flex items-center p-1 py-4">
            <div class="mr-4 h-5rem w-5rem flex-shrink-0 overflow-hidden rounded-4px v-card">
              <el-image
                loading="lazy"
                :src="row.images"
                class="h-full w-full shadow transition-300 hover:scale-110"
                style="border-color: inherit"
                fit="cover">
                <template #error>
                  <small h-4rem w-4rem flex-row-c-c opacity-60 card-default> 暂无图片 </small>
                </template>
              </el-image>
            </div>
            <span flex-1 cursor-pointer truncate @mouseover="onTipOver($event, row.name)"> {{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="price" label="销售价" width="160%" align="right">
        <template #default="{ row }"> ￥{{ currency(row.price) }} </template>
      </el-table-column>
      <el-table-column sortable prop="price" label="浏览量" align="right" width="160%" />
      <el-table-column sortable prop="sales" label="销售量（件）" width="160%" align="right" />
    </el-table>
    <el-tooltip
      ref="tooltipRef"
      :visible="isShowToolTip"
      :popper-options="{
        modifiers: [
          {
            name: 'computeStyles',
            options: {
              adaptive: false,
              enabled: false,
            },
          },
        ],
      }"
      :virtual-ref="buttonRef"
      virtual-triggering
      popper-class="">
      <template #content>
        <span> {{ tooltipTitle }} </span>
      </template>
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>

<style scoped lang="scss"></style>
