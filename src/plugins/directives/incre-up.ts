import currency from 'currency.js'
import { gsap } from 'gsap'
import type { Directive, DirectiveBinding } from 'vue'

/**
 * 自动递增动画 arg :参数表示持续秒数
 */
export const increUp: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    increNumber(el, binding, binding.modifiers?.int)
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    increNumber(el, binding, binding.modifiers?.int)
  },
}

function increNumber(el: Element, binding: DirectiveBinding<any>, isInt?: boolean): void {
  const targetValue = binding.value
  const duration = binding.arg || 1
  const counter = { var: binding.oldValue || 0 }
  gsap.to(counter, {
    var: targetValue,
    duration,
    onUpdate() {
      el.innerHTML = isInt ? String(Math.ceil(counter.var)) : currency(counter.var).toString()
    },
  })
}
