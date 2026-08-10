import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { InjectionKey, Ref } from 'vue'

export { dropdownKey }
export type { DropdownKeyInterface, YDropdownProps }

interface YDropdownProps extends ThemeComponentBaseProps {
  hasScrollbar?: boolean
  openOnHover?: boolean
  /** Which side of the trigger the menu aligns to. */
  position?: 'left' | 'right'
}

interface DropdownKeyInterface extends YDropdownProps {
  open: () => void
  close: (event: Event) => void
  isOpen: Ref<boolean>
  toggle: () => void
  dropdownRef: Ref<EventTarget | null>
  dropdownMenuRef: Ref<EventTarget | null>
  dropdownTriggerRef: Ref<EventTarget | null>
  zIndex: number
  stackIndex: number
}

const dropdownKey: InjectionKey<DropdownKeyInterface> = Symbol('dropdown')
