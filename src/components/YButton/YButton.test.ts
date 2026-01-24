import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YButton from './YButton.vue'

describe('YButton', () => {
  it('renders', () => {
    const button = render(YButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(button.html()).toContain('Click me')
    expect(button.html()).toMatchSnapshot()
  })
})
