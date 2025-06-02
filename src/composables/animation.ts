import { ThemeComponentBaseProps } from '@/types/base-props'
import { getValueFromRef } from '@/utils/get-value-from-ref'
import { isClientSide } from '@/utils/is-client-side'
import { defineEmits, Ref, ref, useAttrs, watch } from 'vue'
import { useEventListener } from './event-listener'
import { useBaseProps } from './use-base-props'

export function useClickEvent(target: Ref<EventTarget | null> | EventTarget) {
  if (!isClientSide()) {
    return { isClickedOnce: ref(false) }
  }
  const isClickedOnce = ref(false)
  const realTarget = getValueFromRef(target) as HTMLElement

  function isTargetClicked(event: MouseEvent) {
    return realTarget && event.target === realTarget
  }

  if (!realTarget) {
    return { isClickedOnce }
  }
  // Add event listener for click events
  // This will set isClickedOnce to true when the target is clicked
  useEventListener(target, 'click', (event: Event) => {
    const isClicked = isTargetClicked(event as MouseEvent)
    if (isClicked) {
      isClickedOnce.value = true
    }
  })

  watch(
    () => isClickedOnce.value,
    (newVal) => {
      if (newVal) {
        realTarget.removeAttribute('style')
      } else {
        realTarget.setAttribute('style', '--clicked: 1')
      }
    },
    { immediate: true },
  )
  return { isClickedOnce }
}

export function useInputEvent<T>(
  target: Ref<EventTarget | null> | EventTarget,
  props?: ThemeComponentBaseProps & Record<string, any>,
) {
  if (!isClientSide()) {
    return { handleInput: () => {}, handleEvent: () => {} }
  }
  const { isDisabled } = useBaseProps(props || {})
  const realTarget = getValueFromRef(target) as HTMLElement
  const attrs = useAttrs()
  const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur'])

  function handleInput(value: T) {
    emit('update:modelValue', value)
    emit('input', value)
  }

  function handleChange(value: T) {
    emit('change', value)
    emit('update:modelValue', value)
  }

  function handleFocus(value: T) {
    emit('focus', value)
  }
  function handleBlur(value: T) {
    emit('blur', value)
  }

  function updateModelValue(value: T) {
    emit('update:modelValue', value)
  }

  function handleEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value as T
    if (isDisabled.value) {
      event.preventDefault()
    }
    //   // // If change event emit exists, call it
    if (attrs[event.type] && !isDisabled.value) {
      // @ts-ignore
      attrs[event.type](value)
    }
    const eventType = event.type as keyof typeof emit
    // emit(eventType, value)
    if (attrs.onChange) {
      handleChange(value)
    }
    if (attrs.onInput) {
      handleInput(value)
    }
    if (attrs.onFocus) {
      handleFocus(value)
    }
    if (attrs.onBlur) {
      handleBlur(value)
    }

    updateModelValue(value)
  }

  return {
    handleInput,
    handleEvent,
  }
}

export function useAnimation(target: Ref<EventTarget | null> | EventTarget) {
  const { handleInput } = useInputEvent(target, {
    modelValue: '',
    'onUpdate:modelValue': () => {},
    onInput: () => {},
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
  })
  const isClickedOnce = ref(false)
  const isHoveredOnce = ref(false)
  // const realTarget = getValueFromRef(target) as HTMLElement

  // function isTargetClicked(event: MouseEvent) {
  //   const realTarget = getValueFromRef(target)

  //   if (realTarget && event.target === realTarget) {
  //     isClickedOnce.value = true
  //   }
  // }

  return {
    handleInput,
    isClickedOnce,
    isHoveredOnce,
  }
}
