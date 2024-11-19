import { BaseModalProps } from './types/YBaseModal.interface'

export const modalDefaultProps: BaseModalProps = {
  hasCloseButton: true,
  hasHeader: true,
  header: 'Modal Header',
  hasVerticalHeader: false,
  hasMainSlot: false,
  mainSlot: '',
  hasFooter: true,
  hasButtonGroupRight: true,
  hasButtonGroupLeft: false,
  hasAction: true,
  action: () => {},
  size: 'medium',
}
