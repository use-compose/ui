import { ThemeComponentBaseProps } from '@/types/base-props'
import { Component, Raw } from 'vue'

export enum YModalSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type YModalTypeValue = (typeof YModalType)[keyof typeof YModalType]

export enum YModalType {
  Default = 'default',
  Drawer = 'drawer',
  FullScreen = 'full-screen',
}

export type YModalSizeValue = (typeof YModalSize)[keyof typeof YModalSize]

export interface BaseModalProps extends ThemeComponentBaseProps {
  // Header specific props
  hasCloseButton?: boolean
  hasHeader?: boolean
  header?: string
  hasVerticalHeader?: boolean

  // Body specific props
  hasMainSlot?: boolean
  mainSlot?: string

  // Footer specific props
  hasFooter?: boolean
  hasButtonGroupRight?: boolean
  hasButtonGroupLeft?: boolean
  actionBtnText?: string
  cancelBtnText?: string
  leftBtnText?: string

  // Modal specific props
  size?: YModalSize
  type?: YModalType
}

export interface YModalHeaderProps {
  hasCloseButton?: boolean
  hasHeader?: boolean
  header?: string
  hasVerticalHeader?: boolean
}

export interface YModalFooterProps {
  hasButtonGroupLeft?: boolean
  hasButtonGroupRight?: boolean
  actionBtnText?: string
  cancelBtnText?: string
  leftBtnText?: string
}

export interface ModalSlotOptions {
  component: Raw<Component>
  attrs?: BaseModalProps
}
