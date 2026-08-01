import { Ref } from 'vue'

export interface DropdownInterface {
  isOpen: Ref<boolean>
  open(): void
  toggle(): void
  close(event: Event): void
  isSelectionClicked(event: Event): void
  hasScrollbar: boolean
}
