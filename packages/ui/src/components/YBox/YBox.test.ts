import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YBox from './YBox.vue'

function styleOf(html: ReturnType<typeof render>) {
  return html.container.querySelector('.y-box') as HTMLElement
}

describe('YBox', () => {
  it('renders', () => {
    const ybox = render(YBox, {
      // slots: {
      //   default: 'Default content for YBox component',
      // },
    })

    // expect(ybox.html()).toContain('Default content for YBox component')
    expect(ybox.html()).toMatchSnapshot()
  })

  it('emits no inline style at all when no props are passed', () => {
    // The whole point of resolving to `undefined` (not a default value) for
    // unset props: a plain `<YBox>` must not carry any inline style that
    // could clobber a hand-written utility class merged in via attrs
    // fallthrough (e.g. `<YStack class="padding-md">`), since inline style
    // always outranks a class regardless of CSS layer.
    const el = styleOf(render(YBox))
    expect(el.getAttribute('style')).toBeNull()
  })

  it('resolves a single spacing token to var(--spacing-x)', () => {
    const el = styleOf(render(YBox, { props: { padding: 'md' } }))
    expect(el.style.getPropertyValue('--y-box-padding')).toBe('var(--spacing-md)')
  })

  it('resolves multi-value padding/margin shorthand token by token', () => {
    // padding/margin are native CSS shorthands (1-4 space-separated values),
    // so each token is resolved independently and rejoined with spaces.
    const el = styleOf(render(YBox, { props: { padding: 'md sm', margin: 'md sm xs lg' } }))
    expect(el.style.getPropertyValue('--y-box-padding')).toBe('var(--spacing-md) var(--spacing-sm)')
    expect(el.style.getPropertyValue('--y-box-margin')).toBe(
      'var(--spacing-md) var(--spacing-sm) var(--spacing-xs) var(--spacing-lg)',
    )
  })

  it('passes non-token margin values through unchanged (auto, 0, raw lengths)', () => {
    const el = styleOf(render(YBox, { props: { margin: 'auto 0 2rem' } }))
    expect(el.style.getPropertyValue('--y-box-margin')).toBe('auto 0 2rem')
  })

  it('resolves named radius tokens, including none/full which have no matching spacing scale entry', () => {
    expect(
      styleOf(render(YBox, { props: { radius: 'medium' } })).style.getPropertyValue(
        '--y-box-radius',
      ),
    ).toBe('var(--radius-medium)')
    expect(
      styleOf(render(YBox, { props: { radius: 'none' } })).style.getPropertyValue('--y-box-radius'),
    ).toBe('var(--border-radius-0)')
    expect(
      styleOf(render(YBox, { props: { radius: 'full' } })).style.getPropertyValue('--y-box-radius'),
    ).toBe('var(--border-radius-9999)')
  })

  it('passes a raw radius value through unchanged', () => {
    const el = styleOf(render(YBox, { props: { radius: '4px' } }))
    expect(el.style.getPropertyValue('--y-box-radius')).toBe('4px')
  })

  it('maps width/height tokens to their literal CSS values', () => {
    const el = styleOf(render(YBox, { props: { width: 'half', height: 'screen' } }))
    expect(el.style.getPropertyValue('--y-box-width')).toBe('50%')
    expect(el.style.getPropertyValue('--y-box-height')).toBe('100svh')
  })

  it('resolves a known backgroundColor token through the --color-bg-* scale', () => {
    const el = styleOf(render(YBox, { props: { backgroundColor: 'subtle' } }))
    expect(el.style.getPropertyValue('--y-box-bg')).toBe('var(--color-bg-subtle)')
  })

  it('passes an unrecognized backgroundColor through unchanged, without producing invalid var() syntax', () => {
    const el = styleOf(render(YBox, { props: { backgroundColor: '#ff0000' } }))
    expect(el.style.getPropertyValue('--y-box-bg')).toBe('#ff0000')
  })

  it('decomposes a space-separated border token string into style/color/width', () => {
    const el = styleOf(render(YBox, { props: { border: 'width-medium primary solid' } }))
    expect(el.style.getPropertyValue('--y-box-border-width')).toBe('var(--border-width-medium)')
    expect(el.style.getPropertyValue('--y-box-border-color')).toBe('var(--color-border-primary)')
    expect(el.style.getPropertyValue('--y-box-border-style')).toBe('solid')
  })

  it('accepts border as an array of tokens (Storybook inline-check control shape)', () => {
    const el = styleOf(render(YBox, { props: { border: ['accent', 'dashed'] } }))
    expect(el.style.getPropertyValue('--y-box-border-color')).toBe('var(--color-border-accent)')
    expect(el.style.getPropertyValue('--y-box-border-style')).toBe('dashed')
  })

  it('maps individual border sides to their own longhand instead of the shared width var', () => {
    const el = styleOf(render(YBox, { props: { border: 'top' } }))
    expect(el.style.borderTopWidth).toBe('var(--border-width-default)')
    expect(el.style.getPropertyValue('--y-box-border-width')).toBe('')
  })
})
