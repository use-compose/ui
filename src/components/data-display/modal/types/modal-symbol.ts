// modalKey.ts
import { DefineComponent, type Component, type InjectionKey } from 'vue'
import { BaseModalProps } from './YBaseModal.interface'

interface ModalSlots {
  header?: Component
  footer?: Component
}
export interface ModalState {
  component?: object
  props?: BaseModalProps
  slots?: ModalSlots
  isVisible: boolean
}

export interface ShowModalParams {
  component?: Component | DefineComponent | object | string
  props?: BaseModalProps
  slots?: ModalSlots
}

export interface ModalKeyInterface extends BaseModalProps {
  show({ component, props, slots }: ShowModalParams): void
  close(): void
  modalState: ModalState
}

export const modalKey: InjectionKey<ModalKeyInterface> = Symbol('modal')
