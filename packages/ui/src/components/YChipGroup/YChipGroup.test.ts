import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import YChip from '../YChip/YChip.vue'
import YChipGroup from './YChipGroup.vue'

function renderGroup(props: Record<string, unknown>, values: string[]) {
  return render(YChipGroup, {
    props,
    slots: {
      default: () => values.map((value) => h(YChip, { value, key: value }, () => value)),
    },
  })
}

describe('YChipGroup', () => {
  it('renders', () => {
    const { html } = renderGroup({ modelValue: [] }, ['a', 'b'])

    expect(html()).toMatchSnapshot()
  })

  it('single-select: selecting a chip replaces the previous selection', async () => {
    const onUpdateModelValue = vi.fn()
    const { container } = renderGroup(
      { modelValue: ['a'], 'onUpdate:modelValue': onUpdateModelValue },
      ['a', 'b'],
    )

    const chips = container.querySelectorAll('[role="button"]')
    await fireEvent.click(chips[1])

    expect(onUpdateModelValue).toHaveBeenCalledWith(['b'])
  })

  it('single-select: re-clicking the selected chip clears the selection', async () => {
    const onUpdateModelValue = vi.fn()
    const { container } = renderGroup(
      { modelValue: ['a'], 'onUpdate:modelValue': onUpdateModelValue },
      ['a', 'b'],
    )

    const chips = container.querySelectorAll('[role="button"]')
    await fireEvent.click(chips[0])

    expect(onUpdateModelValue).toHaveBeenCalledWith([])
  })

  it('multi-select: toggles individual chips in and out of the selection', async () => {
    const onUpdateModelValue = vi.fn()
    const { container } = renderGroup(
      { modelValue: ['a'], multiple: true, 'onUpdate:modelValue': onUpdateModelValue },
      ['a', 'b'],
    )

    const chips = container.querySelectorAll('[role="button"]')

    await fireEvent.click(chips[1])
    expect(onUpdateModelValue).toHaveBeenCalledWith(['a', 'b'])

    await fireEvent.click(chips[0])
    expect(onUpdateModelValue).toHaveBeenCalledWith([])
  })
})
