import { ThemeComponentBaseProps } from '@/utils/base-props'
import { Component, Raw } from 'vue'

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
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'drawer' | 'full-screen'
}

export interface ModalSlotOptions {
  component: Raw<Component>
  attrs?: BaseModalProps
}
