import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import {
  colorProps,
  rawProps,
  sizeProps,
  stateProps,
  useColor,
  useRaw,
  useSize,
  useState,
  useVariant,
  variantProps,
} from './theming'

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
  ...rawProps,
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
  const { rawClasses } = useRaw(mergedProps.value)

  const baseClasses = computed(() => {
    const classes = []

    classes.push(
      variantClass.value,
      stateClass.value,
      sizeClass.value,
      colorClass.value,
      rawClasses.value,
    )
    return [...classes]
  })

  // const semanticTokens = computed(() => {
  //   return getTokenColors(props)
  // })

  return {
    baseClasses,
    isDisabled,
    // semanticTokens,
  }
}
