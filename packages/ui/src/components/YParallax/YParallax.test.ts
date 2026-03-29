import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YParallax from './YParallax.vue'

describe('YParallax', () => {
  it('renders', () => {
    const yparallax = render(YParallax, {
      // slots: {
      //   default: 'Default content for YParallax component',
      // },
    })

    // expect(yparallax.html()).toContain('Default content for YParallax component')
    expect(yparallax.html()).toMatchSnapshot()
  })
})
