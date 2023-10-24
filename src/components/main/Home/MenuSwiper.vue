<script lang="ts" setup>
import { SwiperSlide, useSwiper } from 'swiper/vue'
</script>

<template>
  <FoldSwiper
    class="select-none"
    :shadow="true"
    :navigation="{
      enabled: true,
      prevEl: '.swiper-left-btn',
      nextEl: '.swiper-right-btn',
    }">
    <!-- 个人 -->
    <SwiperSlide>
      <div
        class="content-card flex flex-col items-center border-2px bg-white dark:border-[var(--el-color-primary)] dark:bg-dark-5">
        <el-image
          lodaing="lazy"
          class="h-6rem w-6rem flex-row-c-c rounded-1/2 shadow"
          src="https://public-cdn-oss.mosoteach.cn/avatar/2021/91/125cc0794c06f55ec6628339b4baee63.jpg?v=1615285685&x-oss-process=style/s300x300">
          <template #error>
            <span i-solar:user-bold block opacity-40 style="width: 60%; height: 60%" />
          </template>
        </el-image>
        <h3 mt-2 tracking-0.5>
          阿航
        </h3>
        <small mt-2 tracking-0.5>
          未填写
        </small>
      </div>
    </SwiperSlide>
    <!-- 设备信息 -->
    <SwiperSlide>
      <div class="content-card border-2px border-[var(--el-color-info)] border-solid bg-dark-3">
        <h3 text-center text-light>设备信息</h3>
        <DeviceMenu class="grid grid-cols-1 mt-4 gap-4" />
      </div>
    </SwiperSlide>
  </FoldSwiper>
</template>

<style lang="scss" scoped>
.content-card {
  --at-apply: 'max-w-2/3 w-220px mx-a h-220px rounded-12px p-6';
}
.liner {
  background: linear-gradient(to bottom, var(--el-color-info-light-9), #ffffff 100%);
}
</style>
