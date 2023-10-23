<script lang="ts" setup>
import { EffectCards, Mousewheel, Navigation, Parallax } from "swiper/modules";
import { Swiper } from "swiper/vue";

const { width, navigation } = withDefaults(
  defineProps<{
    width?: number
    navigation?: object | boolean
  }>(),
  {
    navigation: true,
  },
);
</script>

<template>
  <Swiper
    class="group relative"
    effect="cards"
    :cards-effect="{
      slideShadows: false,
      perSlideRotate: 0,
    }"
    :width="width"
    :slides-per-view="1"
    :grab-cursor="true"
    :mousewheel="true"
    :navigation="navigation"
    :modules="[EffectCards, Parallax, Mousewheel, Navigation]"
    :loop="true"
  >
    <slot name="default" />

    <i
      v-if="navigation"
      i-solar:alt-arrow-left-linear z-2 group-hover:opacity-100
      class="swiper-left-btn absolute left-0 top-1/2 block h-2rem w-2rem cursor-pointer px-4 opacity-40 transition-200 -translate-y-1/2"
    />
    <i
      v-if="navigation"
      group-hover-default i-solar:alt-arrow-right-linear z-2 group-hover:opacity-100
      class="swiper-right-btn absolute right-0 top-1/2 block h-2rem w-2rem cursor-pointer px-4 opacity-40 transition-200 -translate-y-1/2"
    />
  </Swiper>
</template>
