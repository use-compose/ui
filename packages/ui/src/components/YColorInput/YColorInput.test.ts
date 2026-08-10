import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YColorInput from './YColorInput.vue'

describe('YColorInput', () => {
  it('propagates a change to v-model', async () => {
    const { container, emitted } = render(YColorInput, { props: { modelValue: '#000000' } })
    const input = container.querySelector('input[type="color"]') as HTMLInputElement

    await fireEvent.change(input, { target: { value: '#ff0000' } })

    expect(emitted()['update:modelValue']?.[0]).toEqual(['#ff0000'])
    expect(emitted().change?.[0]).toEqual(['#ff0000'])
  })

  it('does not commit on input alone, only on change (avoids firing on every drag tick)', async () => {
    const { container, emitted } = render(YColorInput, { props: { modelValue: '#000000' } })
    const input = container.querySelector('input[type="color"]') as HTMLInputElement

    await fireEvent.input(input, { target: { value: '#ff0000' } })

    expect(emitted()['update:modelValue']).toBeUndefined()
  })
})
