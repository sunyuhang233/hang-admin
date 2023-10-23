import type { App } from 'vue'

import { increUp } from './incre-up'


const directivesList: any = {
  'incre-up': increUp, // 自动增加动画
}
const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}
export default directives
