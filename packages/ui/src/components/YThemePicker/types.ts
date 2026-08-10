import { ThemeComponentBaseProps } from '@/composables/component-theme'

export interface YThemePickerProps extends ThemeComponentBaseProps {
  /** Show the theme colour inputs. */
  showColors?: boolean
  /** Show the design-token knobs. */
  showTokens?: boolean
}
