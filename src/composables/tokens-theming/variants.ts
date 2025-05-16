import { Variant } from '@/types/base-props'
import { computed } from 'vue'

export function useVariants(variant: Variant) {
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
