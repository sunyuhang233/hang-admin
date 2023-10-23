<script lang="ts" setup>
import { useColorMode, useDark, watchDebounced } from "@vueuse/core";

// 切换动画
const mode = useColorMode();
const isDark = useDark();
// 节流watch
watchDebounced(isDark, (value) => {
  mode.store.value = value ? "dark" : "light";
});
/**
 * 切换主题
 * @param event
 */
function toggle(event: MouseEvent) {
  // @ts-expect-error
  if (!event || !document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return null;

  const isDarkValue = !isDark.value;
  const clientX = event.clientX;
  const clientY = event.clientY;
  const maxRadius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));
  // @ts-expect-error
  const transition = document.startViewTransition(() => {
    isDark.value = isDarkValue;
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${clientX}px ${clientY}px)`,
      `circle(${maxRadius.toFixed(0)}px at ${clientX}px ${clientY}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: isDarkValue ? clipPath : [...clipPath].reverse(),
      },
      {
        duration: 550,
        easing: "ease-in-out",
        pseudoElement: isDarkValue ? "::view-transition-new(root)" : "::view-transition-old(root)",
      },
    );
  });
}
</script>

<template>
  <ElButton
    class="btn mx-2"
    round
    @click="toggle"
  >
    <span hidden overflow-hidden truncate md:inline>
      {{ isDark ? "切换日间" : "切换夜间" }}
    </span>
    <img
      v-if="!isDark"
      src="@/assets/images/icon/sun.svg"
      class="h-1.3em w-1.3em"
      alt="sun 日间模式"
    >
    <img
      v-else
      src="@/assets/images/icon/moon.svg"
      class="h-1.3em w-1.3em fill-light-5"
      alt="sun 日间模式"
    >
  </ElButton>
</template>

<style lang="scss" scoped>
.btn {
  padding: 0em 0.4em;
  transition: $transition-delay;

  span {
    width: 0;
    overflow: hidden;
    transition: $transition-delay;
    letter-spacing: 0.1em;
  }

  &:hover span,
  &:focus span {
    width: 4.6em;
    margin: 0 0.4em;
  }
}
</style>
