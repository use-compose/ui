// use-theme-tokens.ts
import { isClientSide } from '@/utils/is-client-side'
import type { YThemeToken } from 'unholy-tokens/types/tokens'

// ✅ only string keys
export type YThemeTokenName = Extract<keyof YThemeToken, string>

// ✅ css var union
export type YCssVarName = `--${YThemeTokenName}`

export function useThemeTokens(target: HTMLElement = document.documentElement) {
  type Token = YThemeTokenName

  const setToken = (token: Token, value: string | null) => {
    if (!isClientSide()) return
    const cssVar = `--${token}` as YCssVarName
    if (value === null) target.style.removeProperty(cssVar)
    else target.style.setProperty(cssVar, value)
  }

  const getToken = (token: Token) => {
    if (!isClientSide()) return ''
    return getComputedStyle(target).getPropertyValue(`--${token}`).trim()
  }

  const setTokens = (patch: Partial<Record<Token, string | null>>) => {
    if (!isClientSide()) return
    for (const [k, v] of Object.entries(patch) as Array<[Token, string | null]>) {
      setToken(k, v)
    }
  }

  return { setToken, getToken, setTokens }
}
