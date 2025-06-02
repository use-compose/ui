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
  console.log('📟 - target → ', target)
  const isClickedOnce = ref(false)
  const realTarget = getValueFromRef(target) as HTMLElement
  console.log('📟 - realTarget → ', realTarget)

  function isTargetClicked(event: MouseEvent) {
    return realTarget && event.target === realTarget
  }

  if (!realTarget) {
    console.warn('📟 - realTarget is not defined, cannot add click event listener')
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
  console.log('📟 - target → ', target)
  const realTarget = getValueFromRef(target) as HTMLElement
  console.log('📟 - realTarget → ', realTarget)
  const attrs = useAttrs()
  console.log('📟 - attrs → ', attrs)
  console.log('📟 - attrs → ', attrs)
  const emit = defineEmits(['update:modelValue', 'input', 'change', 'focus', 'blur'])

  function handleInput(value: T) {
    emit('update:modelValue', value)
    emit('input', value)
  }

  function handleChange(value: T) {
    console.log('📟 - value → ', value)
    emit('change', value)
    emit('update:modelValue', value)
  }

  function handleFocus(value: T) {
    console.log('📟 - value → ', value)
    emit('focus', value)
  }
  function handleBlur(value: T) {
    console.log('📟 - value → ', value)
    emit('blur', value)
  }

  function updateModelValue(value: T) {
    console.log('📟 - updateModelValue → ', value)
    emit('update:modelValue', value)
  }

  function handleEvent(event: Event) {
    const value = (event.target as HTMLInputElement).value as T
    if (isDisabled.value) {
      console.warn('📟 - useInput: isDisabled is true, input will not be interactive.')
      event.preventDefault()
    }
    //   // // If change event emit exists, call it
    if (attrs[event.type] && !isDisabled.value) {
      // @ts-ignore
      attrs[event.type](value)
    }
    console.log('📟 - attrs[event.type] → ', attrs[event.type])
    const eventType = event.type as keyof typeof emit
    console.log('📟 - eventType → ', eventType)
    // emit(eventType, value)
    console.log('📟 - value → ', value)
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

export function useAnimation(target?: Ref<EventTarget | null> | EventTarget) {
  console.log('📟 - target → ', target)
  const { handleInput } = useInputEvent()
  const isClickedOnce = ref(false)
  const isHoveredOnce = ref(false)
  const realTarget = getValueFromRef(target) as HTMLElement
  console.log('📟 - realTarget → ', realTarget)

  function isTargetClicked(event: MouseEvent) {
    const realTarget = getValueFromRef(target)

    if (realTarget && event.target === realTarget) {
      isClickedOnce.value = true
    }
  }

  return {
    handleInput,
    isClickedOnce,
    isHoveredOnce,
  }
}
