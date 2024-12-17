import { DefineComponent, type Component, type InjectionKey } from 'vue'
import { BaseModalProps } from './YBaseModal.interface'

interface ModalState {
  content?: object | string | DefineComponent | Component
  props?: BaseModalProps
  isVisible: boolean
}

interface ShowModalParams {
  content: string | DefineComponent | Component
  props?: BaseModalProps
}

interface ModalKeyInterface extends BaseModalProps {
  show({ content, props }: ShowModalParams): void
  close(): void
  modalState: ModalState
}

const modalKey: InjectionKey<ModalKeyInterface> = Symbol('modal')

interface ModalActionsKeyInterface {
  action?(): void
  cancel?(): void
  close(): void
  leftAction?(): void
  open(): void
  toggle?(): void
}

const modalActionsKey: InjectionKey<ModalActionsKeyInterface> = Symbol('modalActions')

export {
  modalActionsKey,
  modalKey,
  type ModalActionsKeyInterface,
  type ModalKeyInterface,
  type ModalState,
  type ShowModalParams,
}
