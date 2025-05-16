import {
  BaseModalProps,
  YModalSize,
  YModalType,
  type YModalSizeValue,
  type YModalTypeValue,
} from '../types'
import { modalDefaultProps } from './modal-default-props'

export { getModalClasses }

export const modalSizeClass: { [key in YModalSizeValue]: string } = {
  [YModalSize.Small]: 'size-small',
  [YModalSize.Medium]: 'size-medium',
  [YModalSize.Large]: 'size-large',
}

export const modalTypeClass: { [key in YModalTypeValue]: string } = {
  [YModalType.Default]: 'y-modal',
  [YModalType.Drawer]: 'y-drawer',
  [YModalType.FullScreen]: 'y-full-screen-modal',
}

function getModalClasses(props: BaseModalProps = modalDefaultProps): string {
  const { size, type } = props

  return `y-dialog ${modalSizeClass[size || YModalSize.Medium]} ${modalTypeClass[type || YModalType.Default]}`
}
