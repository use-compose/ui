import { ref, Ref } from 'vue'

// TODO: rewrite (GPT)
export function useCssVars(target?: Ref<HTMLElement | null>) {
  const el = target
    ? target
    : ref(typeof document !== 'undefined' ? document.documentElement : null)

  const setVar = (name: `--${string}`, value: string | null) => {
    if (!el.value) return
    if (value === null) el.value.style.removeProperty(name)
    else el.value.style.setProperty(name, value)
  }

  const getVar = (name: `--${string}`) => {
    if (!el.value || typeof getComputedStyle === 'undefined') return ''
    return getComputedStyle(el.value).getPropertyValue(name).trim()
  }

  return { el, setVar, getVar }
}
