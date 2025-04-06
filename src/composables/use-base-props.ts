import { Color, Size, ThemeComponentBaseProps, Variant } from '@/types/base-props'
import { computed } from 'vue'

export enum BasePropClasses {
  Disabled = '-disabled',
  Raw = '-raw',
  Outlined = '-outlined',
  Text = '-text',
  Small = '-small',
  Medium = '-medium',
  Large = '-large',
  Color = '-primary',
}

const variantClasses: { [key in Variant]: string } = {
  contained: '',
  outlined: BasePropClasses.Outlined,
  text: '',
}

const sizeClasses: { [key in Size]: string } = {
  small: BasePropClasses.Small,
  medium: BasePropClasses.Medium,
  large: BasePropClasses.Large,
}

const colorClasses: { [key in Color]: string } = {
  primary: BasePropClasses.Color,
  secondary: '-secondary',
  danger: '',
}

export const basePropsDefault: ThemeComponentBaseProps = {
  disabled: false,
  variant: 'contained',
  size: 'medium',
  color: 'primary',
}

export function useBaseProps(props: ThemeComponentBaseProps) {
  const baseClasses = computed(() => {
    const { disabled, raw, size, color, variant } = props

    const variantClass = variant ? variantClasses[variant] : ''
    const sizeClass = size ? sizeClasses[size] : ''
    const colorClass = color ? colorClasses[color] : ''

    return [
      disabled ? BasePropClasses.Disabled : '',
      raw ? BasePropClasses.Raw : '',
      variantClass,
      sizeClass,
      colorClass,
    ]
  })

  return {
    baseClasses,
  }
}
