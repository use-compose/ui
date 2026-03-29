import { PropType } from 'vue'
import {
  BaseModalProps,
  YModalSize,
  YModalSizeValue,
  YModalType,
  YModalTypeValue,
} from '../types/YBaseModal.interface'

export const modalDefaultProps: BaseModalProps & { modelValue: boolean } = {
  modelValue: false,
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

export const modalPropsDefinition = {
  modelValue: {
    type: Boolean,
    default: modalDefaultProps.modelValue,
  },
  hasCloseButton: {
    type: Boolean,
    default: modalDefaultProps.hasCloseButton,
  },
  hasHeader: {
    type: Boolean,
    default: modalDefaultProps.hasHeader,
  },
  header: {
    type: String,
    default: modalDefaultProps.header,
  },
  hasVerticalHeader: {
    type: Boolean,
    default: modalDefaultProps.hasVerticalHeader,
  },
  mainSlot: {
    type: String,
    default: modalDefaultProps.mainSlot,
  },
  hasFooter: {
    type: Boolean,
    default: modalDefaultProps.hasFooter,
  },
  actionBtnText: {
    type: String,
    default: modalDefaultProps.actionBtnText,
  },
  cancelBtnText: {
    type: String,
    default: modalDefaultProps.cancelBtnText,
  },
  size: {
    type: String as PropType<YModalSizeValue>,
    default: 'medium',
  },
  type: {
    type: String as PropType<YModalTypeValue>,
    default: 'default',
  },
}
