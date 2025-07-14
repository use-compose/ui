import { ThemeComponentBaseProps } from '@/composables/component-theme'

export interface YInputProps extends ThemeComponentBaseProps {
  modelValue?: string | number | boolean
  label?: string
  name?: string
  inputClass?: string
  inputRef?: string
  placeholder?: string
  type?: string
  hero?: boolean
  noBorder?: boolean
  noMargin?: boolean
  error?: boolean
  errorMsg?: string
  focus?: boolean
}
