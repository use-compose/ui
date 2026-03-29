import { ThemeComponentBaseProps } from '@/composables/component-theme'

export interface YCheckboxProps extends ThemeComponentBaseProps {
  modelValue?: boolean
  label?: string
  name?: string
  placeholder?: string
  hero?: boolean
  error?: boolean
  errorMsg?: string
  focus?: boolean
}
