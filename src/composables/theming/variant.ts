import { computed, PropType } from 'vue'

export { useVariant, variantProps, variants }
export type { Variant, VariantProps }

const variants = ['contained', 'outlined', 'text'] as const
type Variant = (typeof variants)[number]
interface VariantProps {
  variant?: Variant
}

const variantProps = {
  variant: {
    type: String as PropType<Variant>,
    default: 'contained',
    validator: (value: Variant) => variants.includes(value),
  },
}

function useVariant(props: VariantProps) {
  const { variant = 'contained' } = props

  const variantClasses: { [key in Variant]: string } = {
    contained: 'contained',
    outlined: 'outlined',
    text: 'text',
  }

  const variantClass = computed(() => {
    return variantClasses[variant] || variantClasses.contained
  })

  return {
    variantClass,
  }
}
