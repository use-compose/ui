import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { InjectionKey } from 'vue'
import type { YChipValue } from '../YChip/YChip.types'

export interface YChipGroupProps extends ThemeComponentBaseProps {
  modelValue?: YChipValue[]
  /**
   * Allow more than one chip selected at once. Single-select otherwise:
   * selecting a chip clears any previous selection, and re-clicking the
   * already-selected chip clears the selection entirely.
   */
  multiple?: boolean
}

export interface YChipGroupKeyInterface {
  isSelected(value?: YChipValue): boolean
  toggle(value?: YChipValue): void
}

const yChipGroupKey: InjectionKey<YChipGroupKeyInterface> = Symbol('chipGroupKey')

export { yChipGroupKey }
