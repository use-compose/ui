import { describe, expect, it } from 'vitest'
import { resolveComposeBg } from './resolve-bg'

const THEME_BG = 'var(--color-bg, var(--color-bg-page))'

describe('resolveComposeBg', () => {
  it('paints nothing when the prop is absent or off', () => {
    expect(resolveComposeBg(undefined)).toBeUndefined()
    expect(resolveComposeBg(false)).toBeUndefined()
    expect(resolveComposeBg('  ')).toBeUndefined()
  })

  it('uses the theme background for `true`', () => {
    expect(resolveComposeBg(true)).toBe(THEME_BG)
  })

  it('treats a bare `bg` / `color-bg` as the theme background', () => {
    expect(resolveComposeBg('bg')).toBe(THEME_BG)
    expect(resolveComposeBg('color-bg')).toBe(THEME_BG)
  })

  it('resolves tokens with or without a prefix', () => {
    expect(resolveComposeBg('info')).toBe('var(--color-bg-info)')
    expect(resolveComposeBg('bg-info')).toBe('var(--color-bg-info)')
    expect(resolveComposeBg('color-bg-info')).toBe('var(--color-bg-info)')
    expect(resolveComposeBg('accent')).toBe('var(--color-bg-accent)')
    expect(resolveComposeBg('accent-subtle')).toBe('var(--color-bg-accent-subtle)')
    expect(resolveComposeBg('elevated')).toBe('var(--color-bg-elevated)')
  })

  it('wraps a custom property reference', () => {
    expect(resolveComposeBg('--my-surface')).toBe('var(--my-surface)')
  })

  it('passes any other CSS color through', () => {
    expect(resolveComposeBg('#fff')).toBe('#fff')
    expect(resolveComposeBg('oklch(0.7 0.1 240)')).toBe('oklch(0.7 0.1 240)')
    expect(resolveComposeBg('var(--whatever)')).toBe('var(--whatever)')
  })
})
