const sizes = ['small', 'medium', 'large'] as const
type Size = (typeof sizes)[number]

const colors = ['primary', 'secondary', 'danger'] as const
type Color = (typeof colors)[number]

const variants = ['contained', 'outlined', 'text'] as const
type Variant = (typeof variants)[number]

const states = ['base', 'hover', 'active', 'focus', 'disabled'] as const
type State = (typeof states)[number]

interface ThemeComponentBaseProps {
  raw?: boolean
  size?: Size
  color?: Color
  variant?: Variant
  state?: State
}

export { colors, sizes, states, variants }
export type { Color, Size, State, ThemeComponentBaseProps, Variant }
