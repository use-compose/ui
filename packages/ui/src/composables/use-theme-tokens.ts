import { MarginKey } from './../components/utils'
// use-theme-tokens.ts
import type { YThemeToken } from '@/assets/css/theme/tokens/types/token-css-vars'
import { DesignTokens } from '@/assets/css/theme/tokens/types/token.types'
import { tokens } from '@/assets/css/theme/tokens/types/tokens.tree'
import type { BorderKey, HeightKey, RadiusKey, SpacingKey, WidthKey } from '@/components/utils'
import { useStorage } from '@/composables/use-storage'
import { isClientSide } from '@/utils/is-client-side'
import { isTSInterface } from 'unreadable-typescript'
import { computed, getCurrentInstance, onMounted, reactive } from 'vue'

// ✅ only string keys
export type TokenCategory = Extract<keyof DesignTokens, string>
export type TokenType = Extract<keyof TokenCategory, string>

export type TokenValue = Extract<
  SpacingKey | RadiusKey | HeightKey | WidthKey | BorderKey | MarginKey,
  string
>

// ✅ css var union
export type YCssVarName = `--${TokenCategory}`

export type YThemeTokenName = Extract<keyof YThemeToken, string>

export interface TokenCTI {
  category: TokenCategory
  type: TokenType
  value: TokenValue
}

export function useThemeTokens(target: HTMLElement = document.documentElement) {
  type Token = TokenCategory

  const setToken = (token: Token, value: TokenValue | TokenType | null) => {
    if (!isClientSide()) return

    const designToken = { token: value } as Partial<DesignTokens>

    if (value && !isTSInterface(designToken, [token], [value])) {
      // Verify if the token is from the right set of tokens (optional, can be removed for performance)
      const cssVar = `--${token}-${value}` as YCssVarName
      if (value === null) target.style.removeProperty(cssVar)
      else target.style.setProperty(cssVar, value)
    }
  }

  const getToken = (token: YThemeTokenName) => {
    if (!isClientSide()) return ''
    return getComputedStyle(target).getPropertyValue(`--${token}`).trim()
  }

  const setTokens = (patch: Partial<Record<Token, TokenValue | null>>) => {
    if (!isClientSide()) return
    for (const [k, v] of Object.entries(patch) as Array<[Token, TokenValue | null]>) {
      setToken(k, v)
    }
  }

  return { setToken, getToken, setTokens }
}

/**
 * How a token's value should be edited. `color` is reserved for plain hex, the
 * only form `<input type="color">` round-trips; `oklch()`/`rgb()` and
 * `var()`/`calc()` chains stay text so they are not silently mangled.
 */
export type TokenKind = 'color' | 'length' | 'number' | 'expr' | 'text'

export interface TokenLeaf {
  /** The custom property this leaf is emitted as, e.g. `--border-width-base`. */
  cssVar: string
  category: TokenCategory
  /** Path below the category, e.g. `width-base`. */
  path: string
  /** Last segment — used as the control label. */
  name: string
  /** Value from the generated token tree, before any override. */
  defaultValue: string
  kind: TokenKind
}

const HEX_RE = /^#[0-9a-f]{3,8}$/i
const EXPR_RE = /^(var|calc|clamp|min|max|env)\(/i
const LENGTH_RE = /^-?[\d.]+(px|rem|em|%|vh|vw|vmin|vmax|ch|deg|s|ms)$/i
const NUMBER_RE = /^-?[\d.]+$/

export function detectTokenKind(value: string): TokenKind {
  if (HEX_RE.test(value)) return 'color'
  if (EXPR_RE.test(value)) return 'expr'
  if (LENGTH_RE.test(value)) return 'length'
  if (NUMBER_RE.test(value)) return 'number'
  return 'text'
}

/** Flattens one category of the generated token tree into one row per leaf. */
export function flattenCategory(category: TokenCategory): TokenLeaf[] {
  const out: TokenLeaf[] = []

  const walk = (node: Record<string, unknown>, path: string[]) => {
    for (const [key, value] of Object.entries(node)) {
      const next = [...path, key]
      if (value !== null && typeof value === 'object') {
        walk(value as Record<string, unknown>, next)
        continue
      }
      const defaultValue = String(value)
      out.push({
        cssVar: `--${category}-${next.join('-')}`,
        category,
        path: next.join('-'),
        name: next[next.length - 1],
        defaultValue,
        kind: detectTokenKind(defaultValue),
      })
    }
  }

  walk(tokens[category] as unknown as Record<string, unknown>, [])
  return out
}

/**
 * Live editor for one token category. Overrides are written straight to `:root`
 * so the page rethemes immediately, persisted so they survive a reload, and
 * individually resettable.
 */
export function useToken(tokenKey: TokenCategory) {
  // The types *within* this category (`width`, `style`, `radius` for `border`) —
  // not the top-level category list.
  const tokenTypes = Object.keys(tokens[tokenKey]) as TokenType[]
  const leaves = flattenCategory(tokenKey)

  const storage = useStorage<Record<string, string>>(`token:${tokenKey}`)
  const overrides = reactive<Record<string, string>>({ ...(storage.get() ?? {}) })

  function rootStyle() {
    return isClientSide() ? document.documentElement.style : null
  }

  function setToken(cssVar: string, value: string) {
    overrides[cssVar] = value
    rootStyle()?.setProperty(cssVar, value)
    storage.set({ ...overrides })
  }

  function resetToken(cssVar: string) {
    delete overrides[cssVar]
    rootStyle()?.removeProperty(cssVar)
    storage.set({ ...overrides })
  }

  function resetAll() {
    for (const cssVar of Object.keys(overrides)) {
      rootStyle()?.removeProperty(cssVar)
      delete overrides[cssVar]
    }
    storage.remove()
  }

  /** The value in effect: the override if there is one, else the token default. */
  function valueOf(leaf: TokenLeaf) {
    return overrides[leaf.cssVar] ?? leaf.defaultValue
  }

  function isOverridden(cssVar: string) {
    return cssVar in overrides
  }

  const overrideCount = computed(() => Object.keys(overrides).length)

  // Re-apply persisted overrides once the DOM exists, so a reload looks like the
  // session that set them.
  if (getCurrentInstance()) {
    onMounted(() => {
      for (const [cssVar, value] of Object.entries(overrides)) {
        rootStyle()?.setProperty(cssVar, value)
      }
    })
  }

  return {
    category: tokenKey,
    tokenTypes,
    leaves,
    overrides,
    overrideCount,
    setToken,
    resetToken,
    resetAll,
    valueOf,
    isOverridden,
  }
}

export function useTokens(tokenKeys: TokenCategory[]) {
  const entries = tokenKeys.map((key) => [key, useToken(key)] as const)
  return Object.fromEntries(entries) as Record<TokenCategory, ReturnType<typeof useToken>>
}
