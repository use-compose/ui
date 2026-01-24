import { ColorProps } from '@/composables/theming/color'

export interface YHighlightedTextProps extends ColorProps {
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
  animate?: boolean
  active?: boolean
  stickToLeft?: boolean
}
