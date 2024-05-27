import { BaseProps } from '@/utils/base-props'
import { computed } from 'vue'

export function useBaseComponent(props: BaseProps) {
  const baseClasses = computed(() => {
    const { disabled, raw } = props

    return [disabled ? `disabled` : '', raw ? 'raw' : '']
  })

  return {
    baseClasses,
  }
}
