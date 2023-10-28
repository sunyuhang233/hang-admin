import './assets/styles/animate.scss'
import './assets/styles/init.scss'
import './assets/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'virtual:uno.css'
import 'swiper/css'
import 'swiper/css/navigation'



import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
// swiepr
import 'swiper/css'
import 'swiper/css/navigation'
// echart
import VueCharts from 'vue-echarts'
import * as echarts from './plugins/echart'
import directives from './plugins/directives'
const app = createApp(App)
// 注册
app.component('VChart', VueCharts)
const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(store)
app.use(directives) // 指令
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
