import { modalKey, ModalKeyInterface } from '@/components/overlays/modal/types'
import { inject } from 'vue'

export function useModal() {
  // Function to open a modal with a specific component, props, and optional slot components
  const { show, modalState } = inject<ModalKeyInterface>(modalKey) as ModalKeyInterface

  if (!modalState) throw new Error('useModal must be used within a ModalProvider.')

  return {
    show,
    open,
    close,
  }
}
