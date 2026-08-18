import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YRegion from './YRegion.vue'

describe('YRegion', () => {
  it('renders', () => {
    const yregion = render(YRegion, {
      // slots: {
      //   default: 'Default content for YRegion component',
      // },
    })

    // expect(yregion.html()).toContain('Default content for YRegion component')
    expect(yregion.html()).toMatchSnapshot()
  })
})
