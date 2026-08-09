import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YDateTimeInput from './YDateTimeInput.vue'

describe('YDateTimeInput', () => {
  it('propagates a change to v-model', async () => {
    const { container, emitted } = render(YDateTimeInput, { props: { modelValue: '' } })
    const input = container.querySelector('input[type="datetime-local"]') as HTMLInputElement

    await fireEvent.update(input, '2026-08-09T14:30')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['2026-08-09T14:30'])
  })
})
