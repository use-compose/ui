import { PropType } from 'vue'
import type { DesignTokens } from '../assets/css/theme/tokens/types/token.types'

// TODO: Review as done by Claude 80%
export {
  getSpacingOptions,
  isDefined,
  parseGapProps,
  resolveBackgroundColorValue,
  resolveBorderValue,
  resolveHeightValue,
  resolveRadiusValue,
  resolveSpacingValue,
  resolveWidthValue,
  type ResolvedBorder,
}

function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null
}

// Derive types from DesignTokens interface (type-only import, no runtime dependency)
export type SpacingKey = keyof DesignTokens['spacing']
export type RadiusKey = keyof DesignTokens['radius']
export type WidthKey = keyof DesignTokens['cube']['utility']['width']
export type HeightKey = keyof DesignTokens['cube']['utility']['height']
export type MarginKey = SpacingKey | 'auto' | '0'
export type BorderKey =
  | keyof DesignTokens['cube']['utility']['border']
  | keyof DesignTokens['cube']['utility']['border']['theme']
  | keyof DesignTokens['cube']['utility']['border']['width']
export type BackgroundColorKey = keyof DesignTokens['cube']['utility']['bg']

const spacingOptions: SpacingKey[] = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

function getSpacingOptions(): SpacingKey[] {
  return spacingOptions
}

export function definePropsFromType<T>() {
  return {} as {
    [K in keyof T]: {
      type: PropType<T[K]>
    }
  }
}

/**
 * Resolve a padding/margin value into a real CSS `padding`/`margin` shorthand
 * string. `padding`/`margin` already accept 1-4 space-separated values
 * natively, so there's no need to branch on how many were given — each token
 * is independently resolved to `var(--spacing-x)` when it names a spacing
 * token, and passed through unchanged otherwise (raw CSS values like `1rem`,
 * or margin's `auto`/`0`).
 *
 * e.g. `"md"` => `"var(--spacing-md)"`; `"md sm"` => `"var(--spacing-md) var(--spacing-sm)"`
 */
function resolveSpacingValue(value?: SpacingKey | MarginKey | string): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }

  return value
    ?.toString()
    .split(' ')
    .map((v) => v.trim())
    .map((v) => (spacingOptions.includes(v as SpacingKey) ? `var(--spacing-${v})` : v))
    .join(' ')
}

const RADIUS_VAR_MAP: Record<string, string> = {
  none: 'var(--border-radius-0)',
  light: 'var(--radius-light)',
  medium: 'var(--radius-medium)',
  heavy: 'var(--radius-heavy)',
  full: 'var(--border-radius-9999)',
}

/** Resolve a radius token to its CSS var; unrecognized values pass through
 * unchanged (raw CSS values like `4px`). */
function resolveRadiusValue(value?: RadiusKey | string): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }
  return RADIUS_VAR_MAP[value as string] ?? value
}

const WIDTH_VALUE_MAP: Record<WidthKey, string> = {
  auto: 'auto',
  full: '100%',
  half: '50%',
  quarter: '25%',
  screen: '100svw',
}

function resolveWidthValue(value?: WidthKey): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }
  return WIDTH_VALUE_MAP[value as WidthKey]
}

const HEIGHT_VALUE_MAP: Record<HeightKey, string> = {
  auto: 'auto',
  full: '100%',
  half: '50%',
  quarter: '25%',
  screen: '100svh',
}

function resolveHeightValue(value?: HeightKey): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }
  return HEIGHT_VALUE_MAP[value as HeightKey]
}

const BG_COLOR_TOKENS = new Set([
  'primary',
  'secondary',
  'accent',
  'accent-subtle',
  'neutral',
  'page',
  'subtle',
  'elevated',
  'inset',
  'info',
  'success',
])

/** Known tokens (`primary`, `subtle`, ...) resolve through the `--color-bg-*`
 * scale; anything else (a raw color, an already-full `var()`) passes
 * through unchanged — templating an arbitrary value into a `var()` name
 * would produce invalid CSS for e.g. a hex color. */
function resolveBackgroundColorValue(value?: BackgroundColorKey | string): string | undefined {
  if (!isDefined(value)) {
    return undefined
  }
  return BG_COLOR_TOKENS.has(value as string) ? `var(--color-bg-${value})` : value
}

interface ResolvedBorder {
  color?: string
  style?: string
  width?: string
  topWidth?: string
  rightWidth?: string
  bottomWidth?: string
  leftWidth?: string
}

const BORDER_STYLE_TOKENS = new Set(['solid', 'dashed', 'dotted', 'none'])
const BORDER_COLOR_TOKENS = new Set([
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
])
const BORDER_WIDTH_VAR_MAP: Record<string, string> = {
  'width-xsmall': 'var(--border-width-xsmall)',
  'width-small': 'var(--border-width-small)',
  'width-medium': 'var(--border-width-medium)',
  'width-large': 'var(--border-width-large)',
  all: 'var(--border-width-default)',
}
const BORDER_SIDE_KEY = {
  top: 'topWidth',
  right: 'rightWidth',
  bottom: 'bottomWidth',
  left: 'leftWidth',
} as const

/**
 * Decompose the `border` prop (a token, space-separated token string, or
 * array of tokens — e.g. `"width-medium primary solid"` or
 * `['primary', 'solid']`) into the independent style/color/width pieces
 * `YBox` needs, since CSS's `border` shorthand can't be composed a token at
 * a time the way `padding`/`margin` can.
 */
function resolveBorderValue(
  value?: BorderKey | BorderKey[] | string | string[],
): ResolvedBorder | undefined {
  if (!isDefined(value)) {
    return undefined
  }

  const tokens = Array.isArray(value)
    ? value
    : value
        ?.toString()
        .split(' ')
        .map((v) => v.trim())

  if (!tokens || tokens.length === 0) {
    return undefined
  }

  const resolved: ResolvedBorder = {}

  for (const token of tokens) {
    if (BORDER_STYLE_TOKENS.has(token)) {
      resolved.style = token
    } else if (BORDER_COLOR_TOKENS.has(token)) {
      resolved.color = `var(--color-border-${token})`
    } else if (token in BORDER_WIDTH_VAR_MAP) {
      resolved.width = BORDER_WIDTH_VAR_MAP[token]
    } else if (token in BORDER_SIDE_KEY) {
      resolved[BORDER_SIDE_KEY[token as keyof typeof BORDER_SIDE_KEY]] =
        'var(--border-width-default)'
    }
  }

  return resolved
}

/**
 * Take a input to represent padding in a Vue component props and generate corresponding utility classes
 *
 * e.g.
 * gap="md sm" => will generate ['gap-x-sm', 'gap-y-md']
 *
 * @param {?(SpacingKey | SpacingKey[])} [gapProps]
 * @returns {(string | string[])}
 */
function parseGapProps(gapProps?: SpacingKey | SpacingKey[]): string | string[] {
  if (!isDefined(gapProps)) {
    return []
  }

  const values = gapProps
    ?.toString()
    .split(' ')
    .map((v) => v.trim())

  if (values && values.length === 1) {
    const value = values[0]

    return [`gap-${value}`]
  }

  if (values && values.length === 2) {
    const [row, column] = values
    return [`gap-x-${column}`, `gap-y-${row}`]
  }

  return []
}
