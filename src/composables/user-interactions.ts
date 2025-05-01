import { Color, Size, State, ThemeComponentBaseProps, Variant } from '@/types/base-props'
import { computed } from 'vue'

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

const variantClasses: { [key in Variant]: string } = {
  contained: 'variant-contained',
  outlined: 'variant-outlined',
  text: 'variant-text',
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
  const baseClasses = computed(() => {
    const { raw, size, color, variant, state } = props

    const variantClass = variant ? variantClasses[variant] : ''
    const sizeClass = size ? sizeClasses[size] : ''
    const colorClass = color ? colorClasses[color] : ''
    const stateClass = state ? stateClasses[state] : ''

    const semanticClass = `${color}-${state}`

    return [raw ? BasePropClasses.Raw : '', variantClass, sizeClass, semanticClass]
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
  }
}
