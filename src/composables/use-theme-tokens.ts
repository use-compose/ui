import { YThemeToken } from '@/assets/css/tokens/types/theme'
import { isClientSide } from '@/utils/is-client-side'

// TODO: rewrite (GPT)
export type YThemeTokenName = keyof YThemeToken // e.g. "border-radius-base" | ...
export type YCssVarName = `--${YThemeTokenName}` // e.g. "--border-radius-base" | ...

export function useThemeTokens(target: HTMLElement = document.documentElement) {
  type Token = keyof YThemeToken

  const setToken = (token: Token, value: string | null) => {
    if (!isClientSide()) return
    const cssVar = `--${token}` as const
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
