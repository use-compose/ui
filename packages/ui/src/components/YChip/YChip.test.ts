import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import YChipGroup from '../YChipGroup/YChipGroup.vue'
import YChip from './YChip.vue'

describe('YChip', () => {
  it('renders', () => {
    const { html } = render(YChip, { slots: { default: 'Filter' } })

    expect(html()).toContain('Filter')
    expect(html()).toMatchSnapshot()
  })

  it('is keyboard-focusable and not selected by default', () => {
    const { container } = render(YChip)
    const chip = container.querySelector('[role="button"]') as HTMLElement

    expect(chip).not.toBeNull()
    expect(chip.getAttribute('tabindex')).toBe('0')
    expect(chip.getAttribute('aria-pressed')).toBe('false')
  })

  it('emits remove without toggling selection', async () => {
    const onRemove = vi.fn()
    const { container } = render(YChip, {
      props: { removable: true, onRemove },
    })

    const removeButton = container.querySelector('.y-chip-remove') as HTMLButtonElement
    await fireEvent.click(removeButton)

    expect(onRemove).toHaveBeenCalledOnce()
  })

  it('toggles standalone selection via v-model:selected', async () => {
    const onUpdateSelected = vi.fn()
    const { container } = render(YChip, {
      props: { selected: false, 'onUpdate:selected': onUpdateSelected },
    })

    const chip = container.querySelector('[role="button"]') as HTMLElement
    await fireEvent.click(chip)

    expect(onUpdateSelected).toHaveBeenCalledWith(true)
  })

  it('reads selection from a parent YChipGroup', async () => {
    const onUpdateModelValue = vi.fn()
    const { container } = render(YChipGroup, {
      props: { modelValue: ['a'], multiple: true, 'onUpdate:modelValue': onUpdateModelValue },
      slots: {
        default: () => [
          h(YChip, { value: 'a', key: 'a' }, () => 'A'),
          h(YChip, { value: 'b', key: 'b' }, () => 'B'),
        ],
      },
    })

    const chips = container.querySelectorAll('[role="button"]')
    expect(chips[0].classList.contains('is-selected')).toBe(true)
    expect(chips[1].classList.contains('is-selected')).toBe(false)

    await fireEvent.click(chips[1])
    expect(onUpdateModelValue).toHaveBeenCalledWith(['a', 'b'])
  })
})
