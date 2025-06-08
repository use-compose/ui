import { ThemeComponentBaseProps, Variant, variants } from '@/types/base-props'
import { computed, PropType } from 'vue'

export const variantProps = {
  variant: {
    type: String as PropType<Variant>,
    default: 'contained',
    validator: (value: Variant) => variants.includes(value),
  },
}

export function useVariant(props: ThemeComponentBaseProps) {
  const variant = props.variant || 'contained'

  const variantClasses: { [key in Variant]: string } = {
    contained: 'contained',
    outlined: 'outlined',
    text: 'text',
  }

  const variantClass = computed(() => {
    return variantClasses[variant]
  })

  return {
    variantClass,
  }
}
