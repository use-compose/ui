import { ThemeComponentBaseProps } from '@/types/base-props'

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
