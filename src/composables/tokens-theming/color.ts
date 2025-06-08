import { Color, colors, ThemeComponentBaseProps } from '@/types/base-props'
import { computed, PropType } from 'vue'

export const colorProps = {
  color: {
    type: String as PropType<Color>,
    default: 'primary',
    validator: (value: Color) => colors.includes(value),
  },
}
export function useColor(props: ThemeComponentBaseProps) {
  const color = props.color || 'primary'

  const colorClasses: { [key in Color]: string } = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'danger',
  }

  const colorClass = computed(() => {
    return colorClasses[color]
  })

  return {
    colorClass,
  }
}
