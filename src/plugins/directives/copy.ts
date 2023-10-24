import type { DirectiveBinding } from 'vue'
import { useAsyncCopyText } from '@/utils'
import { ElMessage } from 'element-plus'

/**
 * 使用剪切自定义指令
 * 示例代码:v-copying.toast="'123我是剪切板'"
 */
export const copying = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el.addEventListener(
      'click',
      async (e: Event) => {
        e.stopPropagation()
        const res = await useAsyncCopyText(binding.value || el.innerHTML)
        if (res && binding.modifiers.toast) {
          ElMessage.success({
            message: '成功复制到剪切板!!!',
            grouping: true,
          })
        }
      },
      { passive: true },
    )
  },
}
