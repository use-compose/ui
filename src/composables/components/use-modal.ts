import { modalKey, ModalKeyInterface } from '@/components/data-display/modal/types/modal-symbol'
import { inject } from 'vue'
export type { Ref } from 'vue'

export function useModal() {
  // Function to open a modal with a specific component, props, and optional slot components
  const { show, close, modalState } = inject<ModalKeyInterface>(modalKey) as ModalKeyInterface

  if (!modalState) throw new Error('useModal must be used within a ModalProvider.')

  return {
    show,
    close,
    modalState,
  }
}
