<template>
  <div w-full>
    <!-- header -->
    <HeaderMenu class="sticky left-0 top-0 animate-[0.6s_fade-in] backdrop-blur-20px" />
    <!-- content -->
    <section class="right flex flex-1">
      <!-- 左侧边导航 -->
      <LeftMenu />
      <!-- router-view -->
      <div class="overflow-hidden layout-default">
        <!-- 内容 -->
        <router-view v-slot="{ Component }">
          <keep-alive :exclude="['/login']" :max="12">
            <transition name="fade-lr" mode="out-in">
              <component :is="Component" />
            </transition>
          </keep-alive>
        </router-view>
      </div>
    </section>
  </div>
</template>
