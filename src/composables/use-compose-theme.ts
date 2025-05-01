import { Theme, YTheme } from '@/types/theme'
import { isClientSide } from '@/utils/is-client-side'
import tinycolor from 'tinycolor2'
import { InjectionKey, Ref, inject, provide, ref, watchEffect } from 'vue'
import { useStorage } from './use-storage'
export interface ColorTheme {
  [key: string]: string
}

export const defaultTheme: YTheme = {
  primary: '#ABCDF8',
  background: '#FCECF0',
  dark: '#0b0c0c',
  danger: '#E3514A',
}

interface ThemeComposition {
  theme: Ref<YTheme>
  updateThemeProperty: (key: keyof YTheme, value: string) => void
  renderTheme?: (theme: YTheme) => {
    '--color-primary': string | undefined
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
      const { primary, secondary, background, dark } = theme.value

      const appComposeElement = document.querySelector(':root') as HTMLElement
      console.log('📟 - appComposeElement → ', appComposeElement)
      // const appComposeElement = document.documentElement as HTMLElement
      console.log('📟 - appComposeElement → ', appComposeElement)

      if (!appComposeElement) return

      // H S L for Primary
      const hsl = tinycolor(primary).toHsl()
      appComposeElement.style.setProperty('--color-primary-hue', (Math.round(hsl.h * 100) / 100).toString())
      // appComposeElement.style.setProperty('--theme-primary-saturation', Math.round(hsl.s * 100).toString() + '%')
      appComposeElement.style.setProperty('--color-primary-saturation', Math.round(hsl.s * 100).toString() + '%')
      // appComposeElement.style.setProperty('--theme-primary-lightness', Math.round(hsl.l * 100).toString() + '%')
      appComposeElement.style.setProperty('--color-primary-lightness', Math.round(hsl.l * 100).toString() + '%')
      appComposeElement.style.setProperty('--color-primary', 'hsl(var(--color-primary-hue) var(--color-primary-saturation) var(--color-primary-lightness))')

      appComposeElement.style.setProperty('--theme-hue', 'var(--theme-primary-hue)')
      appComposeElement.style.setProperty('--theme-saturation', 'var(--theme-primary-saturation)')
      appComposeElement.style.setProperty('--theme-lightness', 'var(--theme-primary-lightness)')

      const hslSecondary = tinycolor(secondary).toHsl()
      appComposeElement.style.setProperty('--color-secondary-hue', (Math.round(hslSecondary.h * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-secondary-saturation', Math.round(hslSecondary.s * 100).toString() + '%')
      appComposeElement.style.setProperty('--color-secondary-lightness', Math.round(hslSecondary.l * 100).toString() + '%')
      appComposeElement.style.setProperty('--color-secondary', 'hsl(var(--color-secondary-hue) var(--color-secondary-saturation) var(--color-secondary-lightness))')

      const hslDark = tinycolor(dark).toHsl()
      appComposeElement.style.setProperty('--color-main-dark-hue', (Math.round(hslDark.h * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-main-dark-saturation', (Math.round(hslDark.s * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-main-dark-lightness', (Math.round(hslDark.l * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-main-dark', 'hsl(var(--color-main-dark-h) calc(var(--color-main-dark-s) * 100%) calc(var(--color-main-dark-l) * 100%))')

      const hslDanger = tinycolor(theme.value.danger).toHsl()
      appComposeElement.style.setProperty('--color-danger-hue', (Math.round(hslDanger.h * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-danger-saturation', (Math.round(hslDanger.s * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-danger-lightness', (Math.round(hslDanger.l * 100) / 100).toString())
      appComposeElement.style.setProperty('--color-danger', 'hsl(var(--color-danger-h) calc(var(--color-danger-s) * 100%) calc(var(--color-danger-l) * 100%))')

      appComposeElement.style.setProperty('--color-bg', background || null)
      appComposeElement.style.setProperty('--color-main-dark', dark || null)
      appComposeElement.style.setProperty('--color-danger', theme.value.danger || null)
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
    throw new Error('useTheme must be used within a component that has a parent providing theme, updateThemeProperty, and renderTheme')
  }

  function getPrimary() {
    return isClientSide() ? getComputedStyle(document.documentElement).getPropertyValue('--color-primary') : ''
  }

  function setPrimary(color: string) {
    theme.value.primary = color
  }

  function getBackground() {
    return isClientSide() ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg') : ''
  }

  function setBackground(color: string) {
    theme.value.background = color
  }

  return { theme, updateThemeProperty, getPrimary, setPrimary, getBackground, setBackground }
}
