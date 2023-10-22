// scss 全局导入
import './assets/styles/animate.scss'
import './assets/styles/init.scss'
import './assets/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
// unocss css
import 'virtual:uno.css'
// swiepr
import 'swiper/css'
import 'swiper/css/navigation'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
