import { provide, ref, toValue, type Ref } from 'vue'
import { dropdownKey } from '../extensions'

interface UseDropdownParams {
  dropdownRef: Ref<EventTarget | null> | EventTarget
  isClosingOnSelection?: boolean
  hasScrollbar?: boolean
}

export function useDropdown({
  dropdownRef,
  isClosingOnSelection = true,
  hasScrollbar = true,
}: UseDropdownParams) {
  const isOpen = ref(false)

  function toggle() { isOpen.value = !isOpen.value }
  function open() { isOpen.value = true }

  function isIncludedInElement(event: Event) {
    const target = event.target as HTMLElement
    const el = toValue(dropdownRef) as HTMLElement | null
    return target === el || !!(el && event.composedPath().includes(el))
  }

  function close(event: Event) {
    if (isIncludedInElement(event)) return
    isOpen.value = false
  }

  function isSelectionClicked(event: Event) {
    const target = event.target as HTMLElement
    if (
      isIncludedInElement(event) &&
      (target.getAttribute('data-component') === 'yEditorButton' || target instanceof HTMLButtonElement) &&
      isClosingOnSelection
    ) {
      isOpen.value = false
    }
  }

  provide(dropdownKey, { open, close, isOpen, isSelectionClicked, toggle, hasScrollbar })

  return { isOpen, open, close, toggle, dropdownRef }
}
