import { MarginKey } from './../components/utils'
// use-theme-tokens.ts
import type { YThemeToken } from '@/assets/css/themes/tokens/types/token-css-vars'
import { DesignTokens } from '@/assets/css/themes/tokens/types/token.types'
import { tokens } from '@/assets/css/themes/tokens/types/tokens.tree'
import type { BorderKey, HeightKey, RadiusKey, SpacingKey, WidthKey } from '@/components/utils'
import { useStorage } from '@/composables/use-storage'
import { isClientSide } from '@/utils/is-client-side'
import { isTSInterface } from 'unreadable-typescript'
import { computed, ComputedRef, reactive, Reactive, watchEffect } from 'vue'

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

export function useToken(tokenKey: TokenCategory) {
  type TokenCategory = keyof typeof tokens
  const tokenTypes = Object.keys(tokens) as TokenType[]
  const tokenValues = Object.values(tokens[tokenKey]) as TokenValue[]

  const storage = useStorage<Partial<TokenCTI>>(`token:${tokenKey}`)
  const stored = storage.get()

  const token: Reactive<TokenCTI> = reactive({
    category: tokenKey || ('' as TokenCategory),
    type: (stored?.type || '') as TokenType,
    value: (stored?.value || '') as TokenValue,
  })

  const tokenAsCssVar: ComputedRef<YThemeTokenName> = computed(
    () => `--${token.category}-${token.type}-${token.value}` as YThemeTokenName,
  )

  const rootStyle = document.documentElement.style
  const schedule =
    typeof requestIdleCallback === 'function' ? requestIdleCallback : requestAnimationFrame
  const cancelSchedule =
    typeof cancelIdleCallback === 'function' ? cancelIdleCallback : cancelAnimationFrame
  let pendingId: number | null = null

  watchEffect(() => {
    if (!isClientSide()) return
    if (!token.type || !token.value) return
    const cssVar = tokenAsCssVar.value
    const val = token.value
    if (pendingId) cancelSchedule(pendingId)
    pendingId = schedule(() => {
      rootStyle.setProperty(cssVar, val)
      pendingId = null
    })
  })

  function setToken(ctiAttribute: Partial<TokenCTI>) {
    // Validate type
    if (ctiAttribute.type && !tokenTypes.includes(ctiAttribute.type)) {
      throw new Error(`Invalid token type: ${ctiAttribute.type}`)
    }

    // Validate value
    if (ctiAttribute.value && !tokenValues.includes(ctiAttribute.value)) {
      throw new Error(`Invalid token value: ${String(ctiAttribute.value)}`)
    }

    Object.assign(token, ctiAttribute)
    storage.set({ type: token.type, value: token.value })
  }

  function resetToken() {
    storage.remove()
    token.type = '' as TokenType
    token.value = '' as TokenValue
  }

  return { token, tokenAsCssVar, tokenTypes, tokenValues, setToken, resetToken }
}

export function useTokens(tokenKeys: TokenCategory[]) {
  const entries = tokenKeys.map((key) => [key, useToken(key)] as const)
  return Object.fromEntries(entries) as Record<TokenCategory, ReturnType<typeof useToken>>
}
