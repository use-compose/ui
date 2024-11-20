import { ThemeComponentBaseProps } from '@/utils/base-props'
import { Component, Raw } from 'vue'

export enum YModalSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum YModalType {
  Default = 'default',
  Drawer = 'drawer',
  FullScreen = 'full-screen',
}

export interface BaseModalProps extends ThemeComponentBaseProps {
  hasCloseButton?: boolean
  hasHeader?: boolean
  header?: string
  hasVerticalHeader?: boolean
  hasMainSlot?: boolean
  mainSlot?: string
  hasFooter?: boolean
  hasButtonGroupRight?: boolean
  hasButtonGroupLeft?: boolean
  hasAction?: boolean
  action?: () => void
  size?: YModalSize
  type?: YModalType
}

export interface ModalSlotOptions {
  component: Raw<Component>
  attrs?: BaseModalProps
}
