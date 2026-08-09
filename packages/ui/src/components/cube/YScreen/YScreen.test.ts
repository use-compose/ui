import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YScreen from './YScreen.vue'

describe('YScreen', () => {
  it('renders', () => {
    const yscreen = render(YScreen)
    expect(yscreen.html()).toMatchSnapshot()
  })

  it('defaults to filling the viewport', () => {
    const { container } = render(YScreen)
    const el = container.querySelector('.y-screen') as HTMLElement
    expect(el.style.getPropertyValue('--y-screen-min-height')).toBe('100svh')
  })

  it('accepts a minHeight override and still forwards YBox props', () => {
    const { container } = render(YScreen, { props: { minHeight: '100%', padding: 'md' } })
    const el = container.querySelector('.y-screen') as HTMLElement
    expect(el.style.getPropertyValue('--y-screen-min-height')).toBe('100%')
    expect(el.style.getPropertyValue('--y-box-padding')).toBe('var(--spacing-md)')
  })
})
