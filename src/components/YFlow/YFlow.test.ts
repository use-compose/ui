import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YFlow from './YFlow.vue'

describe('YFlow', () => {
  it('renders', () => {
    const yflow = render(YFlow, {
      // slots: {
      //   default: 'Default content for YFlow component',
      // },
    })

    // expect(yflow.html()).toContain('Default content for YFlow component')
    expect(yflow.html()).toMatchSnapshot()
  })
})
