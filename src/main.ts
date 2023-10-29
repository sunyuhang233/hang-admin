/* eslint-disable import/order */

import App from './App.vue'

// elementicon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'

// pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// autoAnimate
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// router
// scss 全局导入
import './assets/styles/animate.scss'
import './assets/styles/init.scss'
import './assets/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'

// unocss css
import 'virtual:uno.css'

// 指令

// echart
import VueCharts from 'vue-echarts'
import directives from './plugins/directives'
import * as echarts from './plugins/echart'

// swiepr
import 'swiper/css'
import 'swiper/css/navigation'

import router from './router'

// app
const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) app.component(key, component)

// 注册
app.component('VChart', VueCharts)
app.use(autoAnimatePlugin)
app.use(router) // router
app.use(directives) // 指令
app.use(createPinia().use(piniaPluginPersistedstate))
app.mount('#app')
