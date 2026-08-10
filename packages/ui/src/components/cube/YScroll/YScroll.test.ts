import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YScroll from './YScroll.vue'

describe('YScroll', () => {
  it('renders', () => {
    const yscroll = render(YScroll)
    expect(yscroll.html()).toMatchSnapshot()
  })

  it('forwards inherited YBoxProps (padding) to the underlying YBox', () => {
    const { container } = render(YScroll, { props: { padding: 'md' } })
    const el = container.querySelector('.y-scroll') as HTMLElement
    expect(el.style.getPropertyValue('--y-box-padding')).toBe('var(--spacing-md)')
  })

  it("defaults blockSize to a responsive clamp, set inline so it wins over YBox's own height fallback", () => {
    // jsdom's CSS parser doesn't understand `clamp()` and silently drops the
    // whole style assignment, so this checks the declared default directly
    // rather than round-tripping it through a rendered element's style.
    const props = (YScroll as unknown as { props: Record<string, { default?: unknown }> }).props
    expect(props.blockSize.default).toBe('clamp(220px, 115px + 32vw, 520px)')
  })

  it('accepts a blockSize override', () => {
    const { container } = render(YScroll, { props: { blockSize: '30rem' } })
    const el = container.querySelector('.y-scroll') as HTMLElement
    expect(el.style.blockSize).toBe('30rem')
  })
})
