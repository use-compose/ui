import { COMPOSE_BG_TOKENS, type AppComposeBg } from './AppCompose.types'

/** The live theme background, written by `useComposeTheme` from `theme.background`. */
const THEME_BG = 'var(--color-bg, var(--color-bg-page))'

const BG_PREFIX = /^(color-)?bg-?/

/**
 * Turn a `useBg` prop into a CSS color, or `undefined` when no background
 * should be painted. See `AppComposeBg` for the accepted forms.
 */
export function resolveComposeBg(useBg?: AppComposeBg): string | undefined {
  if (useBg === undefined || useBg === false) return undefined
  if (useBg === true) return THEME_BG

  const raw = String(useBg).trim()
  if (!raw) return undefined

  // A custom property reference: `--my-surface` → `var(--my-surface)`
  if (raw.startsWith('--')) return `var(${raw})`

  const token = raw.replace(BG_PREFIX, '')

  // `'bg'` / `'color-bg'` both mean "the theme background"
  if (!token) return THEME_BG

  if ((COMPOSE_BG_TOKENS as readonly string[]).includes(token)) {
    return `var(--color-bg-${token})`
  }

  // Anything else is a plain CSS color — `#fff`, `oklch(…)`, `var(…)`, …
  return raw
}
