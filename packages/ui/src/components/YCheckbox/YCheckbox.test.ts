import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YCheckbox from './YCheckbox.vue'

describe('YCheckbox', () => {
  it('propagates a click to v-model, as a boolean not a string', async () => {
    const { container, emitted } = render(YCheckbox, { props: { modelValue: false } })
    const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement

    await fireEvent.click(input)

    expect(emitted()['update:modelValue']?.[0]).toEqual([true])
  })
})
