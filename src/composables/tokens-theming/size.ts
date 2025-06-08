import { Size, sizes, ThemeComponentBaseProps } from '@/types/base-props'
import { computed, PropType } from 'vue'

export const sizeProps = {
  size: {
    type: String as PropType<Size>,
    default: 'medium',
    validator: (value: Size) => sizes.includes(value),
  },
}

export function useSize(props: ThemeComponentBaseProps) {
  const size = props.size || 'medium'

  const sizeClasses: { [key in Size]: string } = {
    small: 'small',
    medium: 'medium',
    large: 'large',
  }

  const sizeClass = computed(() => {
    return sizeClasses[size]
  })

  return {
    sizeClass,
  }
}
