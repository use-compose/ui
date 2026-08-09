import {
  BaseModalProps,
  YDrawerSide,
  YModalSize,
  YModalType,
  type YDrawerSideValue,
  type YModalSizeValue,
  type YModalTypeValue,
} from '../types'
import { modalDefaultProps } from './modal-default-props'

export { getModalClasses }

export const modalSizeClass: { [key in YModalSizeValue]: string } = {
  [YModalSize.Small]: 'modal-small',
  [YModalSize.Medium]: 'modal-default',
  [YModalSize.Large]: 'modal-large',
}

export const modalTypeClass: { [key in YModalTypeValue]: string } = {
  [YModalType.Default]: 'y-modal',
  [YModalType.Drawer]: 'y-drawer',
  [YModalType.FullScreen]: 'y-full-screen-modal',
}

export const drawerSideClass: { [key in YDrawerSideValue]: string } = {
  [YDrawerSide.Left]: 'y-drawer-left',
  [YDrawerSide.Right]: 'y-drawer-right',
}

function getModalClasses(props: BaseModalProps = modalDefaultProps): string {
  const { size, type, side } = props

  const classes = [
    'y-dialog',
    modalSizeClass[size || YModalSize.Medium],
    modalTypeClass[type || YModalType.Default],
  ]

  // The side class drives `--y-drawer-side`, which is what the slide animation
  // translates by. Only meaningful for drawers.
  if (type === YModalType.Drawer) {
    classes.push(drawerSideClass[side || YDrawerSide.Right])
  }

  return classes.join(' ')
}
