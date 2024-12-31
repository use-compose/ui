type Size = 'small' | 'medium' | 'large'
type Color = 'primary' | 'secondary' | 'danger'
type Variant = 'contained' | 'outlined' | 'text'

interface ThemeComponentBaseProps {
  disabled?: boolean
  interactive?: boolean
  raw?: boolean
  size?: Size
  color?: Color
  variant?: Variant
}

export type { Color, Size, ThemeComponentBaseProps, Variant }
