import { isClientSide } from '@/utils/is-client-side'
import { Ref, ref } from 'vue'

export type InputEventValue = string | number | boolean
export const emitEventCommon = ['click', 'hover', 'focus', 'blur', 'change', 'input'] as const
type EmitEventsCommon = (typeof emitEventCommon)[number]
export const emitEventModelValue = ['update:modelValue'] as const
type EmitEventsModelValue = (typeof emitEventModelValue)[number]

export interface EmitEventsInterface {
  (event: EmitEventsCommon | EmitEventsModelValue, value?: string | number | boolean): void
}

export function useEvents(emit: EmitEventsInterface) {
  if (!isClientSide()) {
    return {
      handleInput: () => {},
      handleEvent: () => {},
      handleChange: () => {},
      handleFocus: () => {},
      handleBlur: () => {},
      updateModelValue: () => {},
      inputValue: ref('' as InputEventValue),
    }
  }

  function getFallbackValue<T>(): T {
    // You can expand this logic as needed
    return '' as T
  }

  const inputValue: Ref<string | number | boolean> = ref(getFallbackValue())

  function updateModelValue(value: InputEventValue) {
    emit('update:modelValue', value)

    inputValue.value = value
  }

  function handleEvent(event: Event, callback?: (value: InputEventValue) => void) {
    if (!event || !event.target) {
      // eslint-disable-next-line no-console
      console.warn('Event or event target is undefined')
      return
    }

    const el = event.target as HTMLInputElement

    if (el.type === 'checkbox' || el.type === 'radio') {
      // For checkbox and radio inputs, we handle the checked state
      const checked = (el as HTMLInputElement).checked
      if (callback) {
        callback(checked)
        return
      }
      updateModelValue(checked)
      return
    }

    // Otherwise, we take the value from the input
    const value = el.value

    // const value = customValue ? customValue : (event.target as HTMLInputElement).value as T
    switch (event.type) {
      case 'input':
        emit('input', value)
        break
      case 'change':
        emit('change', value)
        break
      case 'focus':
        emit('focus', value)
        break
      case 'blur':
        emit('blur', value)
        break
    }

    if (callback) {
      callback(value)
      return
    }
    updateModelValue(value)
  }

  // const handleInputEvent = (event: InputEvent) => (customValue: T) => {
  //   handleEvent(customValue, event)
  // }
  return {
    handleInput: handleEvent,
    handleChange: handleEvent,
    handleEvent: handleEvent,
    handleFocus: (target: HTMLInputElement) => {
      if (target && target.focus) {
        target.focus()
      } else {
        // eslint-disable-next-line no-console
        console.warn('Target is not focusable or does not exist')
      }
    },
    handleBlur: handleEvent,
    updateModelValue,
    inputValue,
  }
}
