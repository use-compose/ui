import { computed, PropType } from 'vue'

export { sizeProps, sizes, useSize }
export type { Size, SizeProps }

const sizes = ['small', 'medium', 'large'] as const
type Size = (typeof sizes)[number]

interface SizeProps {
  size?: Size
}

const sizeProps = {
  size: {
    type: String as PropType<Size>,
    default: 'medium',
    validator: (value: Size) => sizes.includes(value),
  },
}

function useSize(props: SizeProps) {
  const { size = 'medium' } = props

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
