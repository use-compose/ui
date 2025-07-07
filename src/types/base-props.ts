import { Size } from '@/composables/theming/size'
import { State, states } from '@/composables/theming/state'
import type { Variant } from '@/composables/theming/variant'
import { variants } from '@/composables/theming/variant'

const colors = ['primary', 'secondary', 'danger'] as const
type Color = (typeof colors)[number]

interface ThemeComponentBaseProps {
  raw?: boolean
  size?: Size
  color?: Color
  variant?: Variant
  state?: State
}

export { colors, states, variants }
export type { Color, Size, State, ThemeComponentBaseProps, Variant }
