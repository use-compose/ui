import type { TokenCategory } from '@/composables/use-theme-tokens'

/**
 * The scale roots worth exposing in the picker. Every other token in these
 * categories derives from one of them through `calc()`, so moving one of these
 * moves the whole scale — editing the derived leaves individually just breaks
 * the relationship.
 *
 * Deliberately not the whole tree: `color` (198 leaves) is already covered by
 * the theme colour inputs above, and `breakpoint-pool` is a catalogue of
 * third-party presets rather than something you tune.
 */
export const MAIN_TOKEN_PATHS = {
  border: ['width-base', 'width-scale', 'radius-scale'],
  spacing: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
  radius: ['light', 'medium', 'heavy'],
  font: ['minFont', 'maxFont', 'minViewport', 'maxViewport', 'scaleMin', 'scaleMax'],
} satisfies Partial<Record<TokenCategory, string[]>>

export const MAIN_TOKEN_CATEGORIES = Object.keys(MAIN_TOKEN_PATHS) as TokenCategory[]
