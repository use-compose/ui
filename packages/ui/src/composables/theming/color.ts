import { computed, PropType } from 'vue'

export { colorProps, colors, useColor }
export type { Color, ColorProps }

const colors = ['primary', 'secondary', 'danger'] as const
type Color = (typeof colors)[number]

interface ColorProps {
  color?: Color
}

const colorProps = {
  color: {
    type: String as PropType<Color>,
    default: 'primary',
    validator: (value: Color) => colors.includes(value),
  },
}
function useColor(props: ColorProps) {
  const { color = 'primary' } = props

  const colorClasses: { [key in Color]: string } = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'danger',
  }

  const colorClass = computed(() => {
    return colorClasses[color] || colorClasses.primary
  })

  return {
    colorClass,
  }
}
