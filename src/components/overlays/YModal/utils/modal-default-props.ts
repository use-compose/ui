import { BaseModalProps, YModalSize, YModalType } from '../types/YBaseModal.interface'

export const modalDefaultProps: BaseModalProps = {
  hasCloseButton: true,
  hasHeader: true,
  header: 'Modal Header',
  hasVerticalHeader: false,
  mainSlot: '',
  hasFooter: true,
  actionBtnText: 'Action',
  cancelBtnText: 'Cancel',
  size: YModalSize.Medium,
  type: YModalType.Default,
}
