import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YWrapper from './YWrapper.vue'

describe('YWrapper', () => {
  it('renders its content inside the y-wrapper class', () => {
    const { container } = render(YWrapper, {
      slots: { default: '<p>content</p>' },
    })
    expect(container.querySelector('.y-wrapper')).not.toBeNull()
    expect(container.textContent).toContain('content')
  })
})
