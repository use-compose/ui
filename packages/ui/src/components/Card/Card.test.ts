import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import Card from './Card.vue'

describe('Card', () => {
  it('renders', () => {
    const card = render(Card, {
      // slots: {
      //   default: 'Default content for Card component',
      // },
    })

    // expect(card.html()).toContain('Default content for Card component')
    expect(card.html()).toMatchSnapshot()
  })
})
