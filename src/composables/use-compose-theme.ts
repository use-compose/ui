import { Theme, YTheme } from '@/types/theme'
import { isClientSide } from '@/utils/is-client-side'
import { InjectionKey, Ref, inject, provide, ref, watchEffect } from 'vue'
import { useStorage } from './use-storage'

export interface ColorTheme {
  [key: string]: string
}

export const defaultTheme: YTheme = {
  primary: '#ABCDF8',
  background: '#FCECF0',
  dark: '#0b0c0c',
}

interface ThemeComposition {
  theme: Ref<YTheme>
  updateThemeProperty: (key: keyof YTheme, value: string) => void
  renderTheme?: (theme: YTheme) => {
    '--color-primary': string | undefined
    '--color-bg': string | undefined
    '--color-main-dark': string | undefined
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
    }
  }

  const themeComposition: ThemeComposition = {
    theme,
    updateThemeProperty,
    renderTheme,
  }

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

  function getPrimary() {
    return isClientSide()
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
      : ''
  }

  function setPrimary(color: string) {
    theme.value.primary = color
  }

  function getBackground() {
    return isClientSide()
      ? getComputedStyle(document.documentElement).getPropertyValue('--color-bg')
      : ''
  }

  function setBackground(color: string) {
    theme.value.background = color
  }

  watchEffect(() => {
    if (isClientSide()) {
      const { primary, background, dark } = theme.value

      const appComposeElement = document.querySelector('.app-compose') as HTMLElement

      if (!appComposeElement) return

      appComposeElement.style.setProperty('--color-primary', primary || null)
      appComposeElement.style.setProperty('--color-bg', background || null)
      appComposeElement.style.setProperty('--color-main-dark', dark || null)
    }
  })

  return { theme, updateThemeProperty, getPrimary, setPrimary, getBackground, setBackground }
}
