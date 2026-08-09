// @vitest-environment jsdom
import { tokens } from '@/assets/css/theme/tokens/types/tokens.tree'
import { beforeEach, describe, expect, it } from 'vitest'
import { detectTokenKind, flattenCategory, useToken } from './use-theme-tokens'

describe('detectTokenKind', () => {
  it('only treats plain hex as a colour', () => {
    expect(detectTokenKind('#fbefd2')).toBe('color')
    expect(detectTokenKind('#fff')).toBe('color')
    // `<input type="color">` cannot round-trip these, so they stay editable as text.
    expect(detectTokenKind('oklch(0.7 0.1 240)')).toBe('text')
  })

  it('separates expressions from plain lengths and numbers', () => {
    expect(detectTokenKind('calc(var(--a) * 2)')).toBe('expr')
    expect(detectTokenKind('var(--border-width-base)')).toBe('expr')
    expect(detectTokenKind('2px')).toBe('length')
    expect(detectTokenKind('1.25')).toBe('number')
    expect(detectTokenKind('solid')).toBe('text')
  })
})

describe('flattenCategory', () => {
  it('builds the css var from the full path under the category', () => {
    const leaves = flattenCategory('border')
    const base = leaves.find((leaf) => leaf.path === 'width-base')

    expect(base).toBeDefined()
    expect(base?.cssVar).toBe('--border-width-base')
    expect(base?.name).toBe('base')
    expect(base?.defaultValue).toBe(tokens.border.width.base)
  })

  it('reaches every leaf of the category', () => {
    // border = width(7) + style(6) + radius(10)
    expect(flattenCategory('border')).toHaveLength(23)
    expect(flattenCategory('radius')).toHaveLength(3)
  })
})

describe('useToken', () => {
  beforeEach(() => {
    window.localStorage.clear()
    document.documentElement.removeAttribute('style')
  })

  it('lists the types within the category, not the top-level categories', () => {
    // The previous implementation returned all 24 categories here, which made
    // every setToken call throw.
    expect(useToken('border').tokenTypes).toEqual(['width', 'style', 'radius'])
  })

  it('writes an override to :root and reports it as overridden', () => {
    const editor = useToken('border')

    expect(editor.isOverridden('--border-width-base')).toBe(false)

    editor.setToken('--border-width-base', '6px')

    expect(document.documentElement.style.getPropertyValue('--border-width-base')).toBe('6px')
    expect(editor.isOverridden('--border-width-base')).toBe(true)
    expect(editor.overrideCount.value).toBe(1)
  })

  it('falls back to the token default until overridden', () => {
    const editor = useToken('border')
    const leaf = editor.leaves.find((l) => l.cssVar === '--border-width-base')!

    expect(editor.valueOf(leaf)).toBe(tokens.border.width.base)
    editor.setToken(leaf.cssVar, '6px')
    expect(editor.valueOf(leaf)).toBe('6px')
  })

  it('removes the property again on reset', () => {
    const editor = useToken('border')
    editor.setToken('--border-width-base', '6px')
    editor.resetToken('--border-width-base')

    expect(document.documentElement.style.getPropertyValue('--border-width-base')).toBe('')
    expect(editor.isOverridden('--border-width-base')).toBe(false)
  })

  it('clears every override with resetAll', () => {
    const editor = useToken('border')
    editor.setToken('--border-width-base', '6px')
    editor.setToken('--border-width-scale', '2')

    expect(editor.overrideCount.value).toBe(2)
    editor.resetAll()

    expect(editor.overrideCount.value).toBe(0)
    expect(document.documentElement.style.getPropertyValue('--border-width-scale')).toBe('')
  })

  it('persists overrides so a later instance picks them up', () => {
    useToken('border').setToken('--border-width-base', '6px')

    expect(useToken('border').overrides['--border-width-base']).toBe('6px')
  })
})
