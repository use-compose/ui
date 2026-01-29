import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YRow from './YRow.vue'

describe('YRow', () => {
  it('renders', () => {
    const yrow = render(YRow, {
      // slots: {
      //   default: 'Default content for YRow component',
      // },
    })

    // expect(yrow.html()).toContain('Default content for YRow component')
    expect(yrow.html()).toMatchSnapshot()
  })
})
