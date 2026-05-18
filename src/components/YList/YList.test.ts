import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YList from './YList.vue'

describe('YList', () => {
  it('renders', () => {
    const ylist = render(YList, {
      // slots: {
      //   default: 'Default content for YList component',
      // },
    })

    // expect(ylist.html()).toContain('Default content for YList component')
    expect(ylist.html()).toMatchSnapshot()
  })
})
