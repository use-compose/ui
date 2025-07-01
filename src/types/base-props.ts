import { State, states } from '@/composables/theming/state'
import type { Variant } from '@/composables/theming/variant'
import { variants } from '@/composables/theming/variant'

const sizes = ['small', 'medium', 'large'] as const
type Size = (typeof sizes)[number]

const colors = ['primary', 'secondary', 'danger'] as const
type Color = (typeof colors)[number]

interface ThemeComponentBaseProps {
  raw?: boolean
  size?: Size
  color?: Color
  variant?: Variant
  state?: State
}

export { colors, sizes, states, variants }
export type { Color, Size, State, ThemeComponentBaseProps, Variant }
