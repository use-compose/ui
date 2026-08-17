import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import YTimeline from './YTimeline.vue'
import YTimelineItem from './YTimelineItem/YTimelineItem.vue'

const items = [
  { tag: 'Step 1', title: 'First', description: 'First description' },
  { tag: 'Step 2', title: 'Second', description: 'Second description' },
]

function renderTimeline(props: Record<string, unknown> = {}) {
  return render(YTimeline, {
    props,
    slots: {
      default: () => items.map((item) => h(YTimelineItem, { ...item, key: item.title })),
    },
  })
}

describe('YTimeline', () => {
  it('renders', () => {
    const { html } = renderTimeline()

    expect(html()).toMatchSnapshot()
  })

  it('renders one list item per child', () => {
    const { container } = renderTimeline()

    expect(container.querySelectorAll('li.y-timeline-item')).toHaveLength(2)
  })

  it('renders an unordered list by default and an ordered one on request', () => {
    const { container: unordered } = renderTimeline()
    expect(unordered.querySelector('ul.y-timeline')).not.toBeNull()

    const { container: ordered } = renderTimeline({ ordered: true })
    expect(ordered.querySelector('ol.y-timeline')).not.toBeNull()
  })

  it('shows every description and renders no toggle by default', () => {
    const { container } = renderTimeline()

    expect(container.querySelectorAll('.y-timeline-description')).toHaveLength(2)
    expect(container.querySelector('.y-timeline-item.is-collapsible')).toBeNull()
    expect(container.querySelector('button')).toBeNull()
  })

  it('toggles a collapsible item and keeps aria-expanded in step', async () => {
    const { container } = renderTimeline({ collapsible: true })
    const toggle = container.querySelector('.y-timeline-toggle') as HTMLButtonElement

    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(container.querySelector('.y-timeline-item.is-open')).toBeNull()

    await fireEvent.click(toggle)

    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    expect(container.querySelector('.y-timeline-item.is-open')).not.toBeNull()
  })

  it('points aria-controls at the description it reveals', () => {
    const { container } = renderTimeline({ collapsible: true })
    const toggle = container.querySelector('.y-timeline-toggle') as HTMLButtonElement
    const controlled = container.querySelector(`#${toggle.getAttribute('aria-controls')}`)

    expect(controlled).not.toBeNull()
    expect(controlled?.classList.contains('y-timeline-description')).toBe(true)
  })

  it('renders no toggle for an item with nothing to reveal', () => {
    const { container } = render(YTimeline, {
      props: { collapsible: true },
      slots: { default: () => h(YTimelineItem, { title: 'No description' }) },
    })

    expect(container.querySelector('button')).toBeNull()
  })
})
