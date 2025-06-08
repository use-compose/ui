import { YInputProps } from '@/components/form/YInput/types'
import { isClientSide } from '@/utils/is-client-side'
import { EmitFn, Ref, ref } from 'vue'
import { useBaseProps } from './use-base-props'

export type InputEventValue = string | number | boolean

export function useInputEvent(props: YInputProps, attrs: Record<string, unknown>, emit: EmitFn) {
  if (!isClientSide()) {
    return {
      handleInput: () => {},
      handleEvent: () => {},
      handleChange: () => {},
      handleFocus: () => {},
      handleBlur: () => {},
      updateModelValue: () => {},
      inputValue: ref('' as InputEventValue),
      isDisabled: ref(false),
    }
  }

  function getFallbackValue<T>(): T {
    // You can expand this logic as needed
    return '' as T
  }

  // const inputEvent: InputEvent = new InputEvent('input')

  const inputValue: Ref<string | number | boolean> = ref(props.modelValue ?? getFallbackValue())

  const { isDisabled } = useBaseProps(props)

  function updateModelValue(value: InputEventValue) {
    emit('update:modelValue', value)
    inputValue.value = value
  }

  // function onInput(e: InputEvent) {
  //   const el = e.target as HTMLInputElement | HTMLTextAreaElement
  //   inputValue.value = el.value
  // }

  // function onChange(e: Event) {
  //   const el = e.target as HTMLInputElement | HTMLTextAreaElement
  //   inputValue.value = el.value
  // }
  // function onInput(e: Event) {
  //   const el = e.target as HTMLTextAreaElement
  //   model.value = el.value
  //   if (props.modelModifiers?.trim) {
  //     const caretPosition = [el.selectionStart, el.selectionEnd]
  //     nextTick(() => {
  //       el.selectionStart = caretPosition[0]
  //       el.selectionEnd = caretPosition[1]
  //     })
  //   }
  // }
  function handleEvent(event: Event) {
    if (!event || !event.target) {
      // eslint-disable-next-line no-console
      console.warn('Event or event target is undefined')
      return
    }
    if (isDisabled.value) {
      event.preventDefault()
      return
    }
    const el = event.target as HTMLInputElement

    if (el.type === 'checkbox' || el.type === 'radio') {
      // For checkbox and radio inputs, we handle the checked state
      const checked = (el as HTMLInputElement).checked
      updateModelValue(checked)
      return
    }

    // Otherwise, we take the value from the input
    const value = el.value

    // Run native DOM event handler if present
    const attrHandler = attrs[event.type]
    if (typeof attrHandler === 'function') {
      attrHandler(event)
    }

    // const value = customValue ? customValue : (event.target as HTMLInputElement).value as T
    switch (event.type) {
      case 'input':
        emit('input', value)
        break
      case 'change':
        emit('change', value)
        break
      case 'focus':
        el.focus()
        break
      case 'blur':
        emit('blur', value)
        break
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
    isDisabled,
  }
}
