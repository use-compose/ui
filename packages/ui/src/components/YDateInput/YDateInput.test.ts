import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YDateInput from './YDateInput.vue'

describe('YDateInput', () => {
  it('propagates a change to v-model', async () => {
    const { container, emitted } = render(YDateInput, { props: { modelValue: '' } })
    const input = container.querySelector('input[type="date"]') as HTMLInputElement

    await fireEvent.update(input, '2026-08-09')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['2026-08-09'])
  })
})
