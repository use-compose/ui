import { fireEvent, render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import YInput from './YInput.vue'

/**
 * `v-on="handleEvent"` used to bind a single function where `v-on` without
 * an argument requires an event-name-keyed object — Vue silently drops it,
 * so the native input never wrote back to its model. These pin the actual
 * write-back path (`@input`/`@change` -> `model.value` -> emitted event).
 */
describe('YInput', () => {
  it('updates v-model as the user types', async () => {
    const { container, emitted } = render(YInput, { props: { modelValue: '' } })
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.update(input, 'hello')

    expect(emitted()['update:modelValue']?.[0]).toEqual(['hello'])
  })

  it('emits input and change with the resolved value', async () => {
    const { container, emitted } = render(YInput, { props: { modelValue: '' } })
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.input(input, { target: { value: 'a' } })
    await fireEvent.change(input, { target: { value: 'ab' } })

    expect(emitted().input?.[0]).toEqual(['a'])
    expect(emitted().change?.[0]).toEqual(['ab'])
  })

  it('reads .checked (not .value) for checkbox inputs', async () => {
    const { container, emitted } = render(YInput, {
      props: { type: 'checkbox', modelValue: false },
    })
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.click(input)

    expect(emitted()['update:modelValue']?.[0]).toEqual([true])
  })

  it('emits focus/blur', async () => {
    const { container, emitted } = render(YInput)
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.focus(input)
    await fireEvent.blur(input)

    expect(emitted().focus).toHaveLength(1)
    expect(emitted().blur).toHaveLength(1)
  })

  it('forwards attrs (e.g. a parent-supplied change listener) to the native input', async () => {
    let called = false
    const { container } = render(YInput, {
      attrs: { onChange: () => (called = true) },
    })
    const input = container.querySelector('input') as HTMLInputElement

    await fireEvent.change(input)

    expect(called).toBe(true)
  })
})
