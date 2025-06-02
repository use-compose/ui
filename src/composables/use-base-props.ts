import { Color, Size, State, ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import { useColor } from './color'
import { useVariants } from './tokens-theming/variants'

export enum BasePropClasses {
  Disabled = 'disabled',
  Raw = 'raw',
  Outlined = 'outlined',
  Text = 'text',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Color = 'primary',
}

const sizeClasses: { [key in Size]: string } = {
  small: BasePropClasses.Small,
  medium: BasePropClasses.Medium,
  large: BasePropClasses.Large,
}

const colorClasses: { [key in Color]: string } = {
  primary: 'primary',
  secondary: 'secondary',
  danger: 'danger',
}

const stateClasses: { [key in State]: string } = {
  base: 'base',
  hover: 'hover',
  active: 'active',
  focus: 'focus',
  disabled: 'disabled',
}

export const basePropsDefault: ThemeComponentBaseProps = {
  variant: 'contained',
  size: 'medium',
  color: 'primary',
  state: 'base',
}

export function useBaseProps(props: ThemeComponentBaseProps) {
  const { getTokenColors } = useColor(props)
  const baseClasses = computed(() => {
    const { raw, size, color, variant, state } = props

    const classes = []

    if (variant) {
      const { variantClass } = useVariants(variant)
      classes.push(variantClass.value)
    }

    const sizeClass = size ? sizeClasses[size] : ''
    const colorClass = color ? colorClasses[color] : colorClasses.primary
    const stateClass = state ? stateClasses[state] : stateClasses.base

    classes.push(sizeClass)
    classes.push(colorClass)
    classes.push(stateClass)

    if (raw) {
      classes.push(BasePropClasses.Raw)
    }

    return classes
  })

  const semanticTokens = computed(() => {
    return getTokenColors(props)
  })

  const isDisabled = computed(() => {
    return props.state === 'disabled'
  })

  const isRaw = computed(() => {
    return props.raw
  })

  return {
    baseClasses,
    isDisabled,
    isRaw,
    semanticTokens,
  }
}
