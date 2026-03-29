import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { computed } from 'vue'

export const rawProps = {
  raw: {
    type: Boolean,
    default: false,
  },
}

export function useRaw(props: ThemeComponentBaseProps) {
  const isRaw = computed(() => props.raw === true)

  const rawClasses = computed(() => {
    return isRaw.value ? 'raw' : ''
  })

  return {
    isRaw,
    rawClasses,
  }
}
