import { YInputProps } from '@/components/YInput/types'
import { computed, WritableComputedRef } from 'vue'

export type InputEventValue = string | number | boolean

export interface InputEmitsInterface {
  (event: 'update:modelValue' | 'input' | 'change' | 'focus' | 'blur', value: InputEventValue): void
}

interface UseInputParams {
  // Any props shape that carries a `modelValue` — covers `YInputProps`-based
  // wrappers as well as `YCheckboxProps`, which declares its own narrower
  // `modelValue?: boolean` instead of extending `YInputProps`.
  props: Partial<YInputProps> & { modelValue?: InputEventValue }
  emit: InputEmitsInterface
}

/**
 * Proxies a wrapper component's own `modelValue` prop through to the
 * `YInput` it wraps: `YInput` writes back through `v-model` (see
 * YInput.vue), and this re-emits `update:modelValue` on the *wrapper's*
 * `emit` so `v-model` on the wrapper itself stays in sync too.
 *
 * e.g. `<YInputText v-model="x">` renders `<YInput v-model="modelValue">`
 * internally — this computed is what connects the two.
 */
export function useInput({
  props,
  emit,
}: UseInputParams): WritableComputedRef<InputEventValue | undefined> {
  return computed({
    get: () => props.modelValue,
    set: (value) => {
      if (value !== undefined) emit('update:modelValue', value)
    },
  })
}
