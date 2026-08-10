import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YInputText from './YInputText.vue'

describe('YInputText', () => {
  it('propagates typing to v-model', async () => {
    const { container, emitted } = render(YInputText, { props: { modelValue: '' } })
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.update(input, 'hello')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['hello'])
  })
})
