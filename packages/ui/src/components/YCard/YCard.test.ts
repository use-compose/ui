import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'

import YCard from './YCard.vue'

describe('YCard', () => {
  it('renders its default slot', () => {
    const { html } = render(YCard, { slots: { default: 'Card content' } })

    expect(html()).toContain('Card content')
    expect(html()).toMatchSnapshot()
  })

  it('renders title as a focusable link when href is set', () => {
    const { container } = render(YCard, { props: { title: 'Hello', href: '#target' } })
    const link = container.querySelector('a.y-card-link')

    expect(link?.textContent).toBe('Hello')
    expect(link?.getAttribute('href')).toBe('#target')
  })

  it('renders title as plain text when href is not set', () => {
    const { container } = render(YCard, { props: { title: 'Hello' } })

    expect(container.querySelector('a.y-card-link')).toBeNull()
    expect(container.textContent).toContain('Hello')
  })

  it('renders the tag', () => {
    const { container } = render(YCard, { props: { tag: 'Category' } })

    expect(container.textContent).toContain('Category')
  })

  it('adds y-card-flat when flat is set', () => {
    const { container } = render(YCard, { props: { flat: true } })

    expect(container.querySelector('.y-card.y-card-flat')).not.toBeNull()
  })

  it('has no y-card-flat class by default', () => {
    const { container } = render(YCard)

    expect(container.querySelector('.y-card-flat')).toBeNull()
  })
})
