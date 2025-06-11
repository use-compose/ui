import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import { colorProps, useColor } from './tokens-theming/color'
import { sizeProps, useSize } from './tokens-theming/size'
import { stateProps, useState } from './tokens-theming/state'
import { useVariant, variantProps } from './tokens-theming/variant'

export const basePropsDefault: ThemeComponentBaseProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  state: 'base',
}

export const defineComponentBaseProps = {
  ...colorProps,
  ...variantProps,
  ...stateProps,
  ...sizeProps,
  raw: {
    type: Boolean,
    default: false,
  },
}

export function useBaseProps(props: ThemeComponentBaseProps) {
  const mergedProps = computed(() => ({
    ...basePropsDefault,
    ...props,
  }))

  const { variantClass } = useVariant(props)
  const { stateClass, isDisabled } = useState(props)
  const { colorClass } = useColor(props)
  const { sizeClass } = useSize(props)

  const baseClasses = computed(() => {
    const classes = []

    if (mergedProps.value.raw) {
      classes.push('raw')
    }

    return [variantClass.value, stateClass.value, sizeClass.value, colorClass.value]
  })

  // const semanticTokens = computed(() => {
  //   return getTokenColors(props)
  // })

  const isRaw = computed(() => {
    return props.raw
  })

  return {
    baseClasses,
    isDisabled,
    isRaw,
    // semanticTokens,
  }
}
