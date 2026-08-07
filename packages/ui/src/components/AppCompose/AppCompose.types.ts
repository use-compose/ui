import { YTheme } from '@/types'

/**
 * Background tokens exposed by the theme layer as `--color-bg-<token>`.
 * Keep in sync with `assets/css/theme/tokens/css/bg/bg.css`.
 */
export const COMPOSE_BG_TOKENS = [
  'page',
  'subtle',
  'elevated',
  'inset',
  'primary',
  'primary-hover',
  'primary-active',
  'primary-subtle',
  'secondary',
  'accent',
  'accent-hover',
  'accent-subtle',
  'neutral',
  'neutral-strong',
  'info',
  'warning',
  'success',
  'danger',
] as const

export type ComposeBgToken = (typeof COMPOSE_BG_TOKENS)[number]

/**
 * `useBg` accepts, in order of resolution:
 * - `false` / `undefined` — no background is painted
 * - `true` — the theme background, `var(--color-bg)`
 * - a token — `'info'`, `'accent'`, … (the `bg-` / `color-bg-` prefix is optional,
 *   so `'bg-info'` and `'color-bg-info'` resolve the same as `'info'`)
 * - a custom property — `'--my-surface'` becomes `var(--my-surface)`
 * - any other CSS color — passed through untouched
 */
export type AppComposeBg = boolean | ComposeBgToken | (string & {})

export interface AppComposeProps {
  theme?: YTheme
  useBg?: AppComposeBg
}
