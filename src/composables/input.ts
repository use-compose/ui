import { YInputProps } from '@/components/form/YInput/types'
import { EmitFn, InjectionKey, Ref, SetupContext, provide, ref, toRef, watch } from 'vue'
import '../components/overlays/YModal/YModal.scss'
import { useBaseProps } from './use-base-props'

type YinputEvents = 'update:modelValue' | 'focus' | 'blur' | 'change' | 'input' | 'click'

interface UseInputParams {
  target: Ref<EventTarget | null> | EventTarget
  props: YInputProps
  attrs: SetupContext<YinputEvents>['attrs']
  emit: EmitFn

  // TODO:?
  // editor?: Editor
}

export interface inputEventsKeyInterface {
  updateModelValue?(value: string | number | boolean): void
  change?(e: Event): void
  handleEvent?(e: InputEvent): void
  input?(e: Event): void

  focus?(e: Event): void
  blur?(e: Event): void
  click?(e: Event): void
  [key: string]: any // Allow other dynamic event names
  modelValue?: string | number | boolean // For v-model support
}

export const inputEventsKey: InjectionKey<inputEventsKeyInterface> = Symbol('inputEvents')

export function useInput({ target, props, attrs, emit }: UseInputParams) {
  console.log('📟 - target → ', target)
  console.log('📟 - attrs → ', attrs)
  // console.log('📟 - emit → ', emit)
  const { isDisabled } = useBaseProps(props)

  // defineEmits(['change', 'update:modelValue', 'click', 'focus', 'blur', 'input'])

  // 1) Keep a local ref in sync with props.modelValue
  const modelValue = toRef(props.modelValue || '')
  console.log('📟 - modelValue → ', modelValue)
  const localValue = ref(modelValue?.value)

  // Whenever parent changes the value externally, overwrite localValue
  watch(
    () => modelValue?.value,
    (newValue) => {
      console.log('📟 - newValue → ', newValue)
      if (newValue !== localValue.value) {
        localValue.value = newValue
      }
    },
    { immediate: true },
  )

  // 2) Whenever localValue changes (by user input), emit update:modelValue
  watch(localValue, (newVal) => {
    console.log('📟 - newVal → ', newVal)
    emit('update:modelValue', newVal)
    // also emit 'change' for “onChange” semantics if you want
    // emit('change', newVal)
  })

  function handleEvent(event: InputEvent) {
    //   console.log('📟 - event → ', event)

    //   if (isDisabled.value) {
    //     console.log('📟 - isDisabled → ', isDisabled.value)
    //     event.preventDefault()
    //     return
    //   }

    //   if (attrs.onChange) {
    //     emit('change', event)
    //   }

    //   if (attrs.onInput) {
    //     emit('input', event)
    //   }

    //   if (attrs.onFocus) {
    //     emit('focus', event)
    //   }

    //   if (attrs.onBlur) {
    //     emit('blur', event)
    //   }

    //   emit('update:modelValue', (event.target as HTMLInputElement).value)

    if (isDisabled.value) {
      console.warn('📟 - useInput: isDisabled is true, input will not be interactive.')
      event.preventDefault()
    }
    //   // // If change event emit exists, call it
    if (attrs[event.type] && !isDisabled.value) {
      // @ts-ignore
      attrs[event.type](event)
    }
    emit(event.type, event)
  }
  const inputEvents: inputEventsKeyInterface = { handleEvent }

  console.log('📟 - inputEvents → ', inputEvents)
  function updateModelValue(value: string | number) {
    emit('update:modelValue', value)
  }
  if (attrs['update:modelValue']) {
    console.log('📟 - update:modelValue → ', attrs['update:modelValue'])
    inputEvents.updateModelValue = updateModelValue
  }

  function handleChange(event: InputEvent) {
    emit('change', event)
  }

  if (attrs.onChange) {
    inputEvents.change = handleChange
  } else {
    emit('change', event)
  }

  function handleInput(event: InputEvent) {
    emit('input', event)
  }
  if (attrs.onInput) {
    inputEvents.input = handleInput
  } else {
    emit('input', event)
  }

  // listen to blur event
  function handleBlur() {
    emit('blur')
  }

  if (attrs.onBlur) {
    inputEvents.blur = handleBlur
  }

  // const { eventsToEmit, triggerEvent } = useDynamicEmits(attrs)
  // console.log('📟 - eventsToEmit → ', eventsToEmit)

  // function handleEvent(eventName: string, ...args: any[]) {
  //   if (eventsToEmit && eventsToEmit.includes(eventName)) {
  //     triggerEvent(eventName, ...args)
  //   }
  // }
  provide(inputEventsKey, inputEvents)
  return {
    props,
    emit,
    localValue,
    modelValue,
    inputEvents,
    handleChange,
    handleEvent,
    updateModelValue,
    handleInput,
    handleBlur,
  }

  // const { close, isVisible } = inject(modalActionsKey) as ModalActionsKeyInterface
  // const emit = defineEmits(['update:modelValue', 'close', 'action', 'cancel'])

  // const { open, close, isVisible } = useModal({ attrs: props, emit })

  // We first declare open and close which are always always available
  // function open() {
  //   emit('update:modelValue', true)
  // }

  // function close() {
  //   emit('update:modelValue', false)
  // }

  // // Actions to provide to all modal children components
  // const modalActions: ModalActionsKeyInterface = {
  //   open,
  //   close,
  // }

  // // Based on their existence, we add the other actions
  // function cancel() {
  //   emit('cancel')
  // }
  // if (attrs.onCancel) {
  //   modalActions.cancel = cancel
  // } else {
  //   modalActions.cancel = close
  // }

  // function action() {
  //   emit('action')
  // }
  // if (attrs.action) {
  //   modalActions.action = action
  // }

  // // We wrap the value from the v-model in a computed property
  // // to avoid the warning about mutating a prop directly
  // // as value / modelValue can not be directly used as a prop
  // const isVisible = computed(() => {
  //   return props.modelValue
  // })

  // We watch the value of the model and prevent scrolling when the modal is open
  // watch(
  //   () => isVisible.value,
  //   (value) => {
  //     if (value) {
  //       stack.register(modalInstance)
  //       preventScroll()
  //     } else {
  //       stack.unregister(modalInstance)
  //       allowScroll()
  //     }
  //   },
  // )

  // const zIndex = computed(() => stack.getZIndex(modalInstance))

  // // We provide modal actions that can then be used by all modal children components (Header / Footer etc.) by injecting them
  // provide(modalActionsKey, modalActions)

  // return {
  //   zIndex,
  //   transitionName,
  //   isVisible,
  //   open,
  //   close,
  //   stackIndex: stack.getIndex(modalInstance),
  // }
}
