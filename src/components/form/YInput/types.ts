import { ThemeComponentBaseProps } from '@/types/base-props'

export interface YInputProps extends ThemeComponentBaseProps {
  modelValue?: string | null
  label?: string
  name?: string
  placeholder?: string
  type?: string
  hero?: boolean
  noBorder?: boolean
  noMargin?: boolean
  error?: boolean
  errorMsg?: string
  focus?: boolean
}
