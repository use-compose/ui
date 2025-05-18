import {
  modalActionsKey,
  ModalActionsKeyInterface,
  YModalType,
} from '@/components/overlays/YModal/types'
import { BaseModalProps } from '@/components/overlays/YModal/types/YBaseModal.interface'
import { allowScroll, preventScroll } from '@/components/overlays/YModal/utils'
import { computed, provide, SetupContext, watch } from 'vue'
import '../components/overlays/YModal/YModal.scss'
import { useStack } from './stack'

interface UseModalParams {
  props: BaseModalProps & { modelValue: boolean }
  modalContext: SetupContext

  // TODO:?
  // editor?: Editor
}

export function useModal({ props, modalContext }: UseModalParams) {
  const modalInstance = Symbol('rt-modal') // unique identity to identify the modal instance in the stack
  const stack = useStack()

  const transitionName = computed(() => {
    if (props.type === YModalType.Drawer) {
      return 'drawer-slide'
    } else {
      // 'fade' is equivalent to the default transition used by the Transition component
      // https://vuejs.org/guide/built-ins/transition#the-transition-component
      return 'fade'
    }
  })

  const { emit, attrs } = modalContext

  // const { close, isVisible } = inject(modalActionsKey) as ModalActionsKeyInterface
  // const emit = defineEmits(['update:modelValue', 'close', 'action', 'cancel'])

  // const { open, close, isVisible } = useModal({ attrs: props, emit })

  // We first declare open and close which are always always available
  function open() {
    emit('update:modelValue', true)
  }

  function close() {
    emit('update:modelValue', false)
  }

  // Actions to provide to all modal children components
  const modalActions: ModalActionsKeyInterface = {
    open,
    close,
  }

  // Based on their existence, we add the other actions
  function cancel() {
    emit('cancel')
  }
  if (attrs.onCancel) {
    modalActions.cancel = cancel
  } else {
    modalActions.cancel = close
  }

  function action() {
    emit('action')
  }
  if (attrs.action) {
    modalActions.action = action
  }

  // We wrap the value from the v-model in a computed property
  // to avoid the warning about mutating a prop directly
  // as value / modelValue can not be directly used as a prop
  const isVisible = computed(() => {
    return props.modelValue
  })

  // We watch the value of the model and prevent scrolling when the modal is open
  watch(
    () => isVisible.value,
    (value) => {
      if (value) {
        stack.register(modalInstance)
        preventScroll()
      } else {
        stack.unregister(modalInstance)
        allowScroll()
      }
    },
  )

  const zIndex = computed(() => stack.getZIndex(modalInstance))

  // We provide modal actions that can then be used by all modal children components (Header / Footer etc.) by injecting them
  provide(modalActionsKey, modalActions)

  return {
    zIndex,
    transitionName,
    isVisible,
    open,
    close,
    stackIndex: stack.getIndex(modalInstance),
  }
}
