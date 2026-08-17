import { ThemeComponentBaseProps } from '@/composables/component-theme'

export type YChipValue = string | number

export interface YChipProps extends ThemeComponentBaseProps {
  /** Identifies this chip within a parent YChipGroup's `modelValue`. */
  value?: YChipValue
  /**
   * Controlled selection state for standalone use via `v-model:selected`.
   * Ignored inside a `YChipGroup`, which tracks selection itself and derives
   * this chip's selected look from `value` instead.
   */
  selected?: boolean
  /** Shows a trailing remove ("x") button that emits `remove` on click. */
  removable?: boolean
  /** aria-label for the remove button. */
  removeLabel?: string
}
