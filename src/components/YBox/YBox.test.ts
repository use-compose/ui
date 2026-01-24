import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YBox from './YBox.vue'

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
})
