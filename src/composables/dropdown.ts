import { dropdownKey, YDropdownProps } from '@/components/YDropdown/YDropdown.types'
import type { SetupContext } from 'vue'
import { computed, provide, ref, unref, watch } from 'vue'
import { useEventListener } from './event-listener'
import { useStack } from './stack'

interface UseDropdownParams {
  props: YDropdownProps
  context?: SetupContext
  // TODO:?
  // editor?: Editor
}

export function useDropdown({
  props,
  context,
  // dropdownRef,
  // isClosingOnSelection = true,
  // hasScrollbar = true
}: // editor
UseDropdownParams) {
  console.log('📟 - context → ', context)
  console.log('📟 - props → ', props)
  // eslint-disable-next-line no-console
  // console.log('📟 - context → ', context)
  // Register the dropdown instance in the stack for the z-index
  const dropdownInstance = Symbol('dropdown') // unique identity to identify the dropdown instance in the stack
  const stack = useStack()

  const { hasScrollbar, openOnHover } = props
  // eslint-disable-next-line no-console
  console.log('📟 - hasScrollbar → ', hasScrollbar)

  const isOpen = ref(false)
  const dropdownRef = ref<EventTarget | null>(null)
  const dropdownMenuRef = ref<EventTarget | null>(null)
  const dropdownTriggerRef = ref<EventTarget | null>(null)

  if (openOnHover) {
    const triggerElm = unref(dropdownTriggerRef) as HTMLElement | null
    if (triggerElm) {
      useEventListener(triggerElm, 'mouseenter', () => {
        open()
      })
      useEventListener(triggerElm, 'mouseleave', () => {
        close()
      })
    }
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  watch(
    () => isOpen.value,
    (newValue) => {
      if (newValue) {
        stack.register(dropdownInstance)
      } else {
        stack.unregister(dropdownInstance)
      }
    },
  )

  const zIndex = computed(() => stack.getZIndex(dropdownInstance))
  console.log('📟 - zIndex → ', zIndex)

  provide(dropdownKey, {
    open,
    close,
    isOpen,
    toggle,
    dropdownRef,
    dropdownMenuRef,
    dropdownTriggerRef,
    zIndex: zIndex.value,
    stackIndex: stack.getZIndex(dropdownInstance, 1000, 10),
  })

  return {
    isOpen,
    dropdownRef,
    dropdownMenuRef,
    dropdownTriggerRef,
    open,
    close,
    toggle,
    stackIndex: stack.getZIndex(dropdownInstance),
    zIndex: zIndex.value,
  }
}
