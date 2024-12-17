import { BaseModalProps, YModalSize, YModalType } from '../types/YBaseModal.interface'

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
  actionBtnText: 'Action',
  cancelBtnText: undefined,
  leftBtnText: 'Left',
  size: YModalSize.Medium,
  type: YModalType.Default,
}
