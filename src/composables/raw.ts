import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'

export const rawProps = {
  size: {
    type: Boolean,
    default: false,
  },
}

export function useRaw(props: ThemeComponentBaseProps) {
  const isRaw = computed(() => props.raw === true)

  return {
    isRaw,
  }
}
