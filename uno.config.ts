import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  // @ts-expect-errorv-card
  content: {
    pipeline: {
      include: [
        /\.(vue|[js]sx)($|\?)/,
        // 这里只写我需要的，当然你也可以定制，参考：https://unocss.dev/guide/extracting#extracting-from-build-tools-pipeline
        "src/router/routes.ts",
        // include js/ts files
        "src/**/*.{js,ts}",
      ],
    },
  },
  shortcuts: [
    // 自定义
    ["v-card", "bg-[#ffffff93]   dark:bg-dark-5 rounded-1.5 backdrop-blur-12px backdrop-saturate-180"],
    ["card-default", "bg-[#ffffff93] shadow-sm dark:bg-dark-5 rounded-1.5 backdrop-blur-12px backdrop-saturate-180"],
    ["v-btn", "border-0 rounded-1.5"],
    ["btn-default", "min-h-2rem flex-row-c-c cursor-pointer border-default rounded-1.5 v-card"],
    ["v-btn-primary", "border-0 rounded-4px bg-[var(--el-color-primary)] text-white"],
    ["table-default", " v-card border-default bg-white dark:bg-dark-5 rounded-3 overflow-hidden "],
    // 颜色
    ["text-color", "text-dark dark:text-white"],
    ["bg-color", "bg-white dark:bg-dark"],
    // 边框
    ["border-default", "border-1px border-solid border-gray-200 dark:border-dark-300"],
    ["border-default-dashed", "hover:shadow-sm border-2px  border-default border-dashed"],
    ["border-default-hover", `transition-300 hover:shadow hover:border-solid hover:border-[var(--el-color-primary)]  border-default-dashed
    `],
    ["rounded-default", "rounded-1rem"],
    // 布局
    ["flex-row-c-c", "flex flex-row flex-justify-center flex-items-center"],
    ["flex-row-bt-c", "flex flex-row flex-justify-between flex-items-center"],
    ["layout-default", "mx-a sm:px-2rem py-2 md:py-4 w-90vw md:w-95/100"],
    ["layout-default-se", "mx-a sm:px-2rem py-2 md:py-4 w-90vw md:w-4/5"],
    ["absolute-center", "absolute left-1/2 -translate-x-1/2"],
    ["absolute-center-center", "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"],
    // 过渡
  ],
  theme: {
    colors: {
      theme: {
        primary: "var(--el-color-primary)",
      }, // class="text-very-cool"
      tip: {
        main: "var(--el-color-primary)", // class="--el-color-primary"
        green: "hsla(var(--hue, 217), 78%, 51%)", // class="bg-brand-primary"
      },
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: false,
      collections: {
        carbon: () =>
          import("@iconify-json/carbon").then(i => i.icons as any),
        solar: () =>
          import("@iconify-json/solar").then(i => i.icons as any),
      },
    }),
    presetTypography(),
    presetWebFonts({}),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
