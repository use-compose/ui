import { ThemeComponentBaseProps } from '@/composables/component-theme'

export interface YTimelineItemProps extends ThemeComponentBaseProps {
  /** Small eyebrow label above the title, e.g. a step number or a date. */
  tag?: string
  title: string
  description?: string
  /** Draws the enlarged, hollow marker used to call one item out. */
  highlighted?: boolean
  /** Heading level for the title, so a list can sit at the right depth. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
}
