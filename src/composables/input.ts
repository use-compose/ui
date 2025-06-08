import { YInputProps } from '@/components/form/YInput/types'
import { EmitFn, InjectionKey, provide, Ref, ref, watch } from 'vue'
import { InputEventValue, useInputEvent } from './event'
// type YinputEvents = 'update:modelValue' | 'focus' | 'blur' | 'change' | 'input' | 'click'

// interface UseInputParams<T extends YInputProps = YInputProps> {
interface UseInputParams {
  // any type/interface that extends YInputProps
  // This allows for more flexibility in the props passed to useInput
  props: YInputProps & { modelValue?: string | number | boolean }
  attrs: Record<string, unknown>
  emit: EmitFn

  // TODO:?
  // editor?: Editor
}

export interface inputEventsKeyInterface {
  updateModelValue?(value: InputEventValue): void
  handleChange?(e: Event): void
  handleEvent?(e: Event): void
  handleInput?(e: Event): void

  handleFocus?(e: Event | HTMLInputElement): void
  handleBlur?(e: Event): void
  handleClick?(e: Event): void
  modelValue: Ref<string | number | boolean>
}

export const inputEventsKey: InjectionKey<inputEventsKeyInterface> = Symbol('inputEvents')

export function useInput({ props, attrs, emit }: UseInputParams): inputEventsKeyInterface {
  const {
    handleEvent,
    handleChange,
    handleInput,
    handleBlur,
    updateModelValue,
    inputValue,
    handleFocus,
  } = useInputEvent(props, attrs, emit)

  function getDefaultValue(value: unknown): string | number | boolean {
    if (typeof value === 'number') return 0
    if (typeof value === 'boolean') return false
    return ''
  }

  const modelValue: Ref<string | number | boolean> = ref(
    (props.modelValue ?? getDefaultValue(props.modelValue)) as string | number | boolean,
  )

  watch(
    () => inputValue.value,
    (newValue) => {
      if (newValue !== undefined) {
        const newValueAsEvent = newValue
        if (newValueAsEvent !== modelValue.value) {
          modelValue.value = newValueAsEvent
          updateModelValue(newValueAsEvent)
        }
      }
    },
    { immediate: true },
  )

  provide(inputEventsKey, {
    modelValue,
    updateModelValue,
    handleChange,
    handleEvent,
    handleInput,
    handleBlur,
  })

  return {
    modelValue,
    handleChange,
    handleEvent,
    updateModelValue,
    handleInput,
    handleBlur,
    handleFocus,
  }
}
