import { Theme, YTheme } from '@/types/theme'
import { isClientSide } from '@/utils/is-client-side'
import { modeOklch, modeRgb, useMode } from 'culori/fn'
import tinycolor from 'tinycolor2'
import { InjectionKey, Ref, inject, provide, ref, watchEffect } from 'vue'
import { useStorage } from './use-storage'
export interface ColorTheme {
  [key: string]: string
}

export const defaultTheme: YTheme = {
  primary: '#e3c568',
  secondary: '#0c0d0d',
  background: '#FCECF0',
  dark: '#0b0c0c',
  danger: '#E3514A',
}

interface ThemeComposition {
  theme: Ref<YTheme>
  updateThemeProperty: (key: keyof YTheme, value: string) => void
  renderTheme?: (theme: YTheme) => {
    '--color-primary': string | undefined
    '--color-secondary': string | undefined
    '--color-bg': string | undefined
    '--color-main-dark': string | undefined
    '--color-danger': string | undefined
  }
}

const themeCompositionKey: InjectionKey<ThemeComposition> = Symbol('theme')

function checkMissingProperties(providedTheme: YTheme) {
  // Get all keys of the interface dynamically
  const properties = Object.keys(providedTheme) as Array<keyof YTheme>

  // Loop through each property and check if it exists in the object
  properties.forEach((property) => {
    if (providedTheme[property] === undefined) {
      providedTheme[property] = defaultTheme[property]
    }
  })

  return providedTheme
}

function setColorProperties(element: HTMLElement, color: string, prefix: string) {
  const oklch = useMode(modeOklch)
  const rgb = useMode(modeRgb)
  // eslint-disable-next-line no-console
  console.log('📟 - rgb → ', rgb)
  const colorInstance = oklch(color)

  if (!colorInstance) {
    // eslint-disable-next-line no-console
    console.warn(`📟 - Invalid color provided for prefix "${prefix}": ${color}`)
    return
  }
  // const lightness = colorInstance.lightness()
  const lightness = colorInstance.l
  // const chroma = colorInstance.chroma()
  const chroma = colorInstance.c
  // const hue = colorInstance.hue()
  const hue = colorInstance?.h || 0
  const opacity = 1

  element.style.setProperty(`--color-${prefix}-lightness`, lightness.toFixed(2).toString())
  element.style.setProperty(`--color-${prefix}-chroma`, chroma.toFixed(2).toString())
  element.style.setProperty(`--color-${prefix}-hue`, hue.toFixed(2).toString())
  element.style.setProperty(`--color-${prefix}-opacity`, opacity.toString())

  element.style.setProperty(
    `--color-${prefix}`,
    `oklch(var(--color-${prefix}-lightness) var(--color-${prefix}-chroma) var(--color-${prefix}-hue) / var(--color-${prefix}-opacity))`,
  )
}

export function useComposeTheme(userTheme?: YTheme) {
  const { getStorageTheme, setStorageTheme } = useStorage()

  // let initialTheme
  // if(userTheme) {
  let initialTheme: YTheme

  if (userTheme) {
    initialTheme = checkMissingProperties(userTheme)
  } else {
    initialTheme = getStorageTheme() || defaultTheme
  }

  const theme: Ref<YTheme> = ref(initialTheme)

  function updateThemeProperty(key: keyof YTheme, value: string) {
    if (key in theme.value) {
      theme.value[key] = value

      if (isClientSide()) {
        const newTheme = JSON.stringify(theme.value) as unknown as YTheme
        setStorageTheme(newTheme)
      }
    }
  }

  function renderTheme(theme: YTheme) {
    return {
      [Theme.primary]: theme.primary,
      [Theme.secondary]: theme.secondary,
      [Theme.background]: theme.background,
      [Theme.dark]: theme.dark,
      [Theme.danger]: theme.danger,
    }
  }

  const themeComposition: ThemeComposition = {
    theme,
    updateThemeProperty,
    renderTheme,
  }

  watchEffect(() => {
    if (isClientSide()) {
      const { primary, secondary, background, dark, danger } = theme.value

      const appComposeElement = document.documentElement

      if (!appComposeElement) return
      // const oklch = converter('oklch')
      // const primaryColor = Color(primary).lch()
      // console.warn('qsdqsdqsdsq', oklch(primary))
      // // H S L for Primary
      // const lightness = primaryColor.lightness()
      // const chroma = primaryColor.chroma()
      // const hue = primaryColor.hue()
      // const opacity = primaryColor.alpha()

      if (primary) {
        setColorProperties(appComposeElement, primary, 'primary')
      }

      if (secondary) {
        setColorProperties(appComposeElement, secondary, 'secondary')
      }

      if (background) {
        setColorProperties(appComposeElement, background, 'bg')
      }

      if (dark) {
        setColorProperties(appComposeElement, dark, 'main-dark')
      }

      if (danger) {
        setColorProperties(appComposeElement, danger, 'danger')
      }

      // const secondaryColor = Color(secondary).lch()

      // const hslSecondary = tinycolor(secondaryColor).toHsl()

      // const secondaryLightness = secondaryColor.lightness()
      // const secondaryChroma = secondaryColor.chroma()
      // const secondaryHue = secondaryColor.hue()
      // const secondaryOpacity = secondaryColor.alpha()

      // appComposeElement.style.setProperty('--color-secondary-hue', secondaryHue.toString())
      // appComposeElement.style.setProperty(
      //   '--color-secondary-chroma',
      //   (secondaryChroma / 100).toString(),
      // )
      // appComposeElement.style.setProperty(
      //   '--color-secondary-saturation',
      //   Math.round(hslSecondary.s).toString() + '%',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-secondary-lightness',
      //   (secondaryLightness / 100).toString(),
      // )
      // appComposeElement.style.setProperty('--color-secondary-opacity', secondaryOpacity.toString())
      // appComposeElement.style.setProperty(
      //   '--color-secondary',
      //   'oklch(var(--color-secondary-lightness) var(--color-secondary-chroma) var(--color-secondary-hue) / var(--color-secondary-opacity))',
      // )

      // const hslDark = tinycolor(dark).toHsl()
      // const darkOklch = new Color({ color: [hslDark.h, hslDark.s, hslDark.l], type: 'hsl' })

      // const darkLightness = darkOklch.lchab[0] // L
      // const darkChroma = darkOklch.lchab[1] // C
      // const darkHue = darkOklch.lchab[2] // H
      // const darkOpacity = 1 // A

      // appComposeElement.style.setProperty(
      //   '--color-main-dark-hue',
      //   (Math.round(darkHue) / 100).toString() + 'deg',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-main-dark-chroma',
      //   (Math.round(darkChroma) / 100).toString() + 'deg',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-main-dark-saturation',
      //   (Math.round(hslDark.s) / 100).toString() + '%',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-main-dark-lightness',
      //   (Math.round(darkLightness) / 100).toString() + '%',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-main-dark-opacity',
      //   (Math.round(darkOpacity) / 100).toString(),
      // )
      // appComposeElement.style.setProperty(
      //   '--color-main-dark',
      //   'oklch(var(--color-main-dark-lightness) var(--color-main-dark-chroma) var(--color-main-dark-hue) / var(--color-main-dark-opacity))',
      // )

      // const hslDanger = tinycolor(danger).toHsl()
      // const dangerOklch = new Color({ color: [hslDanger.h, hslDanger.s, hslDanger.l], type: 'hsl' })

      // const dangerLightness = dangerOklch.lchab[0] // L
      // const dangerChroma = dangerOklch.lchab[1] // C
      // const dangerHue = dangerOklch.lchab[2] // H
      // const dangerOpacity = 1 // A

      // appComposeElement.style.setProperty(
      //   '--color-danger-hue',
      //   (Math.round(dangerHue) / 100).toString() + 'deg',
      // )

      // appComposeElement.style.setProperty(
      //   '--color-danger-chroma',
      //   (Math.round(dangerChroma) / 100).toString() + 'deg',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-danger-saturation',
      //   Math.round(hslDanger.s).toString() + '%',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-danger-lightness',
      //   Math.round(dangerLightness).toString() + '%',
      // )
      // appComposeElement.style.setProperty(
      //   '--color-danger-opacity',
      //   (Math.round(dangerOpacity) / 100).toString(),
      // )
      // appComposeElement.style.setProperty(
      //   '--color-danger',
      //   'oklch(var(--color-danger-lightness) var(--color-danger-chroma) var(--color-danger-hue) / var(--color-danger-opacity))',
      // )

      // appComposeElement.style.setProperty('--color-bg', background || null)
      // appComposeElement.style.setProperty('--color-main-dark', dark || null)
      // appComposeElement.style.setProperty('--color-danger', theme.value.danger || null)
    }
  })

  provide(themeCompositionKey, themeComposition)

  return { theme, updateThemeProperty, renderTheme }
}

const themeContext: ThemeComposition = {
  theme: ref(defaultTheme),
  updateThemeProperty: () => {},
}

export function useTheme() {
  const { theme, updateThemeProperty } = inject(themeCompositionKey) || themeContext

  if (!theme || !updateThemeProperty) {
    throw new Error(
      'useTheme must be used within a component that has a parent providing theme, updateThemeProperty, and renderTheme',
    )
  }

  type ThemeValue = (typeof Theme)[keyof typeof Theme]

  function getThemeColor(color: ThemeValue) {
    if (color)
      return isClientSide()
        ? getComputedStyle(document.documentElement).getPropertyValue(color as string)
        : ''
  }

  function getHexColor(color: string) {
    return tinycolor(color).toHexString()
  }

  return {
    theme,
    setThemeProperty: updateThemeProperty,
    getPrimary: getThemeColor(Theme.primary),
    setPrimary: updateThemeProperty.bind(null, 'primary'),
    getSecondary: getThemeColor(Theme.secondary),
    setSecondary: updateThemeProperty.bind(null, 'secondary'),
    getBackground: getThemeColor(Theme.background),
    setBackground: updateThemeProperty.bind(null, 'background'),
    getDanger: getThemeColor(Theme.danger),
    setDanger: updateThemeProperty.bind(null, 'danger'),
    getHexColor,
  }
}
