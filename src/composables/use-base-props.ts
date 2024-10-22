import { ThemeComponentBaseProps } from '@/utils/base-props'
import { computed } from 'vue'

enum BasePropClasses {
  disabled = '-disabled',
  raw = '-raw',
  outlined = '-outlined',
  interactive = '-interactive',
  small = '-small',
  medium = '-medium',
  large = '-large',
  color = '-primary',
}

export const basePropsDefault: ThemeComponentBaseProps = {
  disabled: false,
  raw: false,
  outlined: false,
  interactive: false,
  size: 'medium',
  color: 'primary',
}

export function useBaseProps(props: ThemeComponentBaseProps) {
  const baseClasses = computed(() => {
    const { disabled, raw, outlined, interactive, size, color } = props

    const sizeProp =
      size === 'small'
        ? BasePropClasses.small
        : size === 'large'
          ? BasePropClasses.large
          : BasePropClasses.medium
    return {
      [BasePropClasses.disabled]: disabled,
      [BasePropClasses.raw]: raw,
      [BasePropClasses.outlined]: outlined,
      [BasePropClasses.interactive]: interactive,
      [BasePropClasses.color]: color,
      [sizeProp]: true,
    }
  })

  return {
    baseClasses,
  }
}
