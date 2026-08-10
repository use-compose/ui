import { useStorage } from '@/composables/use-storage'
import { Theme, YTheme } from '@/types/theme'
import { isClientSide } from '@/utils/is-client-side'
import { modeOklch, modeRgb, useMode } from 'culori/fn'
import tinycolor from 'tinycolor2'
import { effectScope, Ref, ref, watchEffect } from 'vue'
import { TokenCategory } from './use-theme-tokens'
export interface ColorTheme {
  [key: string]: string
}

export const defaultTheme: Partial<YTheme extends TokenCategory ? YTheme & TokenCategory : YTheme> =
  {
    primary: '#e3c568',
    secondary: '#0c0d0d',
    background: '#FCECF0',
    dark: '#0b0c0c',
    danger: '#E3514A',
    text: '#0c0d0d',
  }

interface ThemeComposition {
  theme: Ref<YTheme>
  updateThemeProperty: (key: keyof YTheme, value: string) => void
  renderTheme: (theme: YTheme) => {
    '--color-primary': string | undefined
    '--color-secondary': string | undefined
    '--color-bg': string | undefined
    '--color-main-dark': string | undefined
    '--color-danger': string | undefined
    '--color-text': string | undefined
  }
}

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
  // Load-bearing despite the unused return value: `culori/fn` is tree-shakeable,
  // so `oklch()` can only parse hex/rgb input once the rgb mode is registered.
  useMode(modeRgb)
  const colorInstance = oklch(color)

  if (!colorInstance) {
    // eslint-disable-next-line no-console
    console.warn(`📟 - Invalid color provided for prefix "${prefix}": ${color}`)
    return
  }
  const lightness = colorInstance.l
  const chroma = colorInstance.c
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

function renderTheme(theme: YTheme) {
  return {
    [Theme.primary]: theme.primary,
    [Theme.secondary]: theme.secondary,
    [Theme.background]: theme.background,
    [Theme.dark]: theme.dark,
    [Theme.danger]: theme.danger,
    [Theme.text]: theme.text,
  }
}

/*
 * The theme is app-wide by construction — colors land on `document.documentElement`,
 * there's only ever one of it per page. So instead of provide/inject (which made
 * `useTheme()` depend on sitting under an `AppCompose`, silently degrading to a
 * no-op when it didn't), this is a module-level singleton: any component can call
 * `useTheme()` standalone, the same way `useThemeTokens`/`useTokens` already work.
 * Mirrors the singleton-ref pattern in `./stack.ts`.
 */
let composition: ThemeComposition | null = null

function createThemeComposition(userTheme?: YTheme): ThemeComposition {
  const storage = useStorage<YTheme>('theme')
  const initialTheme = userTheme ? checkMissingProperties(userTheme) : storage.get() || defaultTheme
  const theme: Ref<YTheme> = ref(initialTheme)

  function updateThemeProperty(key: keyof YTheme, value: string) {
    if (key in theme.value) {
      theme.value[key] = value

      if (isClientSide()) {
        storage.set(theme.value)
      }
    }
  }

  // Detached: this effect must outlive whichever component happens to trigger
  // initialization first (it's shared by every other consumer too), so it
  // can't be tied to that component's own lifecycle.
  const scope = effectScope(true)
  scope.run(() => {
    watchEffect(() => {
      if (!isClientSide()) return

      const { primary, secondary, background, dark, danger, text } = theme.value
      const root = document.documentElement

      if (primary) setColorProperties(root, primary, 'primary')
      if (secondary) setColorProperties(root, secondary, 'secondary')
      if (background) setColorProperties(root, background, 'bg')
      if (dark) setColorProperties(root, dark, 'main-dark')
      if (danger) setColorProperties(root, danger, 'danger')
      if (text) setColorProperties(root, text, 'text')
    })
  })

  return { theme, updateThemeProperty, renderTheme }
}

function getThemeComposition(userTheme?: YTheme): ThemeComposition {
  if (!composition) {
    composition = createThemeComposition(userTheme)
  } else if (userTheme) {
    // An explicit theme (e.g. `<AppCompose :theme="...">`) still applies even
    // if some other consumer already initialized the singleton first.
    const next = checkMissingProperties(userTheme)
    for (const key of Object.keys(next) as Array<keyof YTheme>) {
      const value = next[key]
      if (value) composition.updateThemeProperty(key, value)
    }
  }

  return composition
}

export function useComposeTheme(userTheme?: YTheme) {
  const { theme, updateThemeProperty, renderTheme } = getThemeComposition(userTheme)
  return { theme, updateThemeProperty, renderTheme }
}

export function useTheme() {
  const { theme, updateThemeProperty } = getThemeComposition()

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
    getText: getThemeColor(Theme.text),
    setText: updateThemeProperty.bind(null, 'text'),
    getHexColor,
  }
}
