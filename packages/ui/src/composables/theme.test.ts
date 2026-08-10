import { describe, expect, it } from 'vitest'
import { defaultTheme, useComposeTheme, useTheme } from './theme'

/**
 * `useTheme()` used to require an `AppCompose` ancestor providing the theme
 * via inject — missing that silently degraded to a no-op stub instead of
 * erroring. It's now a module-level singleton (see `theme.ts`), so these
 * pin the two things that promise depends on: it works with zero setup, and
 * every caller shares the same live state. Order matters within this file —
 * the singleton persists across `it()`s, same as `stack.ts`'s.
 */
describe('theme (singleton, no provider required)', () => {
  it('works standalone with no AppCompose ancestor', () => {
    const { theme, getPrimary } = useTheme()
    expect(theme.value.primary).toBe(defaultTheme.primary)
    expect(typeof getPrimary).not.toBe('undefined')
  })

  it('setPrimary updates the shared theme and writes the CSS custom property', () => {
    const { setPrimary } = useTheme()
    setPrimary('#ff0000')

    const { theme } = useTheme()
    expect(theme.value.primary).toBe('#ff0000')
    expect(document.documentElement.style.getPropertyValue('--color-primary-hue')).not.toBe('')
  })

  it('an explicit useComposeTheme(theme) overrides the already-initialized singleton', () => {
    useComposeTheme({ ...defaultTheme, primary: '#00ff00' })

    // A second, unrelated `useTheme()` caller sees the same override — proof
    // it's one shared instance, not two independent composable calls.
    const { theme } = useTheme()
    expect(theme.value.primary).toBe('#00ff00')
  })
})
