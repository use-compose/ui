import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YTimeInput from './YTimeInput.vue'

describe('YTimeInput', () => {
  it('propagates a change to v-model', async () => {
    const { container, emitted } = render(YTimeInput, { props: { modelValue: '' } })
    const input = container.querySelector('input[type="time"]') as HTMLInputElement

    await fireEvent.update(input, '14:30')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['14:30'])
  })
})
