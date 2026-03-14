import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YStack from './YStack.vue'

describe('YStack', () => {
  it('renders', () => {
    const ystack = render(YStack, {
      // slots: {
      //   default: 'Default content for YStack component',
      // },
    })

    // expect(ystack.html()).toContain('Default content for YStack component')
    expect(ystack.html()).toMatchSnapshot()
  })
})
