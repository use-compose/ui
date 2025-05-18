import { ThemeComponentBaseProps } from '@/types/base-props'

// function isDifferentFromThemeValues(color: string, theme: YTheme): boolean {
//   const colorHex = color.toHexString()
//   return color === theme.primary || color === theme.secondary || color === theme.background
// }

function getTextColor(props: ThemeComponentBaseProps) {
  const color = props.color
  // const variant = props.variant
  const state = props.state
  return `var(--color-text-${color}-${state})`
}

function getBackgroundColor(props: ThemeComponentBaseProps) {
  const color = props.color
  // const variant = props.variant
  const state = props.state
  return `var(--component-bg-${color}-${state})`
}

function getBorderColor(props: ThemeComponentBaseProps) {
  const color = props.color
  const variant = props.variant
  const state = props.state
  return `

    --theme-color-bg-hue: var(--color-bg-${color}-hue);
    --theme-color-bg-saturation: var(--color-bg-${color}-saturation);
    --theme-color-bg-lightness: var(--color-bg-${color}-lightness);
    --theme-color-bg-opacity: var(--color-bg-${color}-opacity);

    --variant-bg-hue: var(--variant-${variant}-bg-hue);
    --variant-bg-saturation: var(--variant-${variant}-bg-saturation);
    --variant-bg-lightness: var(--variant-${variant}-bg-lightness);
    --variant-bg-opacity: var(--variant-${variant}-bg-opacity);

    --state-bg-hue: var(--state-${state}-bg-hue);
    --state-bg-saturation: var(--state-${state}-bg-saturation);
    --state-bg-lightness: var(--state-${state}-bg-lightness);
    --state-bg-opacity: var(--state-${state}-bg-opacity);

    --component-bg-hue: calc(var(--theme-color-bg-hue) + var(--variant-bg-hue) + var(--state-bg-hue));
    --component-bg-saturation: calc(var(--theme-color-bg-saturation) + var(--variant-bg-saturation) + var(--state-bg-saturation));
    --component-bg-lightness: calc(var(--theme-color-bg-lightness) + var(--variant-bg-lightness) + var(--state-bg-lightness));
    --component-bg-opacity: calc(var(--theme-color-bg-opacity) + var(--variant-bg-opacity) + var(--state-bg-opacity));

   
    --theme-color-border-hue: var(--color-border-${color}-hue);
    --theme-color-border-saturation: var(--color-border-${color}-saturation);
    --theme-color-border-lightness: var(--color-border-${color}-lightness);
    --theme-color-border-opacity: var(--color-border-${color}-opacity);

    --variant-border-hue: var(--variant-${variant}-border-hue);
    --variant-border-saturation: var(--variant-${variant}-border-saturation);
    --variant-border-lightness: var(--variant-${variant}-border-lightness);
    --variant-border-opacity: var(--variant-${variant}-border-opacity);

    --state-border-hue: var(--state-${state}-border-hue);
    --state-border-saturation: var(--state-${state}-border-saturation);
    --state-border-lightness: var(--state-${state}-border-lightness);
    --state-border-opacity: var(--state-${state}-border-opacity);

    --component-border-hue: calc(var(--theme-color-bg-hue) + var(--variant-border-hue) + var(--state-border-hue));
    --component-border-saturation: calc(var(--theme-color-bg-saturation) + var(--variant-border-saturation) + var(--state-border-saturation));
    --component-border-lightness: calc(var(--theme-color-bg-lightness) + var(--variant-border-lightness) + var(--state-border-lightness));
    --component-border-opacity: calc(var(--theme-color-bg-opacity) + var(--variant-border-opacity) + var(--state-border-opacity));

  --theme-color-text-hue: var(--color-text-${color}-hue);
  --theme-color-text-saturation: var(--color-text-${color}-saturation);
  --theme-color-text-lightness: var(--color-text-${color}-lightness);
  --theme-color-text-opacity: var(--color-text-${color}-opacity);

  --variant-text-hue: var(--variant-${variant}-text-hue);
  --variant-text-saturation: var(--variant-${variant}-text-saturation);
  --variant-text-lightness: var(--variant-${variant}-text-lightness);
  --variant-text-opacity: var(--variant-${variant}-text-opacity);

  --state-text-hue: var(--state-${state}-text-hue);
  --state-text-saturation: var(--state-${state}-text-saturation);
  --state-text-lightness: var(--state-${state}-text-lightness);
  --state-text-opacity: var(--state-${state}-text-opacity);

  --component-text-hue: calc(var(--theme-color-text-hue) + var(--variant-text-hue) + var(--state-text-hue));
  --component-text-saturation: calc(var(--theme-color-text-saturation) * var(--variant-text-saturation) * var(--state-text-saturation));
  --component-text-lightness: calc(var(--theme-color-text-lightness) * var(--variant-text-lightness) * var(--state-text-lightness));
  --component-text-opacity: calc(var(--theme-color-text-opacity) + var(--variant-text-opacity) + var(--state-text-opacity));


     --component-color-bg: hsl(var(--component-bg-hue) var(--component-bg-saturation) var(--component-bg-lightness) / var(--component-bg-opacity));
  --component-color-border: hsl(var(--component-border-hue) var(--component-border-saturation) var(--component-border-lightness) / var(--component-border-opacity));
  --component-color-text: hsl(var(--component-text-hue) var(--component-text-saturation) var(--component-text-lightness) / var(--component-text-opacity));
  `
}
// Composables
export function useColor(props: Partial<ThemeComponentBaseProps>) {
  // eslint-disable-next-line no-console
  console.log('📟 - props → ', props)
  // const color = props.color ? toRef(props, 'color') : toRef(props, 'raw')
  // const variant = props.variant ? toRef(props, 'variant') : toRef(props, 'raw')
  // const state = props.state ? toRef(props, 'state') : toRef(props, 'raw')

  function getTokenColors(props: ThemeComponentBaseProps) {
    if (props.valueOf() !== undefined) {
      // return getBorderColor(props as ThemeComponentBaseProps)
      // '--color-text-token': getTextColor(props as ThemeComponentBaseProps),
      // '--color-bg-token': getBackgroundColor(props as ThemeComponentBaseProps),
    }
  }
  // function setTextColor(color: Color) {
  //   return `var(--color-text-${color})`
  // }

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

  return {
    getTokenColors,
    getTextColor,
    getBackgroundColor,
    getBorderColor,
  }
}
