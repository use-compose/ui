import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YCenter from './YCenter.vue'

describe('YCenter', () => {
  it('renders', () => {
    const ycenter = render(YCenter)
    expect(ycenter.html()).toMatchSnapshot()
  })

  it('exposes the measure prop as a CSS custom property', () => {
    const { container } = render(YCenter, { props: { measure: '20rem' } })
    const el = container.querySelector('.y-center') as HTMLElement
    expect(el.style.getPropertyValue('--y-center-measure')).toBe('20rem')
  })
})
