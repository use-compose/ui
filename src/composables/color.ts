import { Color, ThemeComponentBaseProps } from '@/types/base-props'
import { toRef } from 'vue'

// function isDifferentFromThemeValues(color: string, theme: YTheme): boolean {
//   const colorHex = color.toHexString()
//   return color === theme.primary || color === theme.secondary || color === theme.background
// }

function getTextColor(props: ThemeComponentBaseProps) {
  const color = props.color
  const variant = props.variant
  const state = props.state
  return `var(--color-text-${color}-${state})`
}

function getBackgroundColor(props: ThemeComponentBaseProps) {
  const color = props.color
  const variant = props.variant
  const state = props.state
  return `var(--color-bg-${color}-${state})`
}

function getBorderColor(props: ThemeComponentBaseProps) {
  const color = props.color
  const variant = props.variant
  const state = props.state
  return `var(--color-border-${color}-${state})`
}
// Composables
export function useColor(props: Partial<ThemeComponentBaseProps>) {
  const color = props.color ? toRef(props, 'color') : toRef(props, 'raw')
  const variant = props.variant ? toRef(props, 'variant') : toRef(props, 'raw')
  const state = props.state ? toRef(props, 'state') : toRef(props, 'raw')

  function getTokenColors(props: ThemeComponentBaseProps) {
    if (props.valueOf() !== undefined) {
      // return {
      //   '--color-text-token': getTextColor(props as ThemeComponentBaseProps),
      //   '--color-bg-token': getBackgroundColor(props as ThemeComponentBaseProps),
      //   '--color-border-token': getBorderColor(props as ThemeComponentBaseProps),
      // }
    }

    function setTextColor(color: Color) {
      return `var(--color-text-${color})`
    }

    //   if (isDifferentFromThemeValues(color, theme.value)) {
    //     return {
    //       colorClasses: computed(() => [color]),
    //       colorStyles: computed(() => ({
    //         [color]: theme.value[color],
    //       })),
    //     }
    //   }
    // }

    // if (colors.includes(propsOrColor)) {
    //   const color = propsOrColor as string

    //   if (isDifferentFromThemeValues(color, theme.value)) {
    //     return {
    //       colorClasses: computed(() => [color]),
    //       colorStyles: computed(() => ({
    //         [color]: theme.value[color],
    //       })),
    //     }
    //   }
    // }
  }

  return {
    getTokenColors,
    getTextColor,
    getBackgroundColor,
    getBorderColor,
  }
}
