import { BaseProps } from '@/utils/base-props'
import { computed } from 'vue'

export function useBaseComponent(props: BaseProps) {
  const baseClasses = computed(() => {
    const { disabled, raw, outlined } = props

    return [disabled ? `disabled` : '', raw ? 'raw' : '', outlined ? 'outlined' : '']
  })

  return {
    baseClasses,
  }
}
