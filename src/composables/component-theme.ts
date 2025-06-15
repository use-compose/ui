import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import { useRaw } from './raw'
import { colorProps, useColor } from './tokens-theming/color'
import { sizeProps, useSize } from './tokens-theming/size'
import { stateProps, useState } from './tokens-theming/state'
import { useVariant, variantProps } from './tokens-theming/variant'

export const basePropsDefault: ThemeComponentBaseProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  state: 'base',
  raw: false,
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

type BaseProps<T> = T & ThemeComponentBaseProps

export function useComponentTheme<T>(props: BaseProps<T>) {
  const mergedProps = computed(() => ({
    ...basePropsDefault,
    ...props,
  }))

  const { variantClass } = useVariant(mergedProps.value)
  const { stateClass, isDisabled } = useState(mergedProps.value)
  const { colorClass } = useColor(mergedProps.value)
  const { sizeClass } = useSize(mergedProps.value)
  const { isRaw } = useRaw(mergedProps.value)

  const baseClasses = computed(() => {
    const classes = []

    if (isRaw.value) {
      classes.push('raw')
    }

    classes.push(variantClass.value, stateClass.value, sizeClass.value, colorClass.value)
    return [...classes]
  })

  // const semanticTokens = computed(() => {
  //   return getTokenColors(props)
  // })

  return {
    baseClasses,
    isDisabled,
    isRaw,
    // semanticTokens,
  }
}
