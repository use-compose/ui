import { InjectionKey, Ref } from 'vue'

export interface RtDropdownProps {}

export interface RtDropdownTriggerProps {}

interface RtDropdownKeyInterface {
  open: () => void
  close: (event: Event) => void
  isOpen: Ref<boolean>
  toggle: () => void
  rtDropdownRef: Ref<EventTarget | null>
  rtDropdownMenuRef: Ref<EventTarget | null>
  rtDropdownTriggerRef: Ref<EventTarget | null>
  hasScrollbar?: boolean
  zIndex: number
  stackIndex: number
}

const rtDropdownKey: InjectionKey<RtDropdownKeyInterface> = Symbol('rtDropdown')

export { rtDropdownKey, type RtDropdownKeyInterface }
