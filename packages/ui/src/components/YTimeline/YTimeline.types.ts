import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { InjectionKey } from 'vue'

export interface YTimelineProps extends ThemeComponentBaseProps {
  /** Render an ordered list instead of an unordered one. */
  ordered?: boolean
  /**
   * Let each item collapse its description behind its title. Opt-in rather
   * than viewport-driven: the old implementation read `window.innerWidth`
   * inside the click handler, which never re-evaluated on resize and left
   * `aria-expanded` lying about content that CSS had already revealed.
   */
  collapsible?: boolean
}

interface YTimelineKeyInterface {
  collapsible: boolean
}

const yTimelineKey: InjectionKey<YTimelineKeyInterface> = Symbol('timelineKey')

export { yTimelineKey }
export type { YTimelineKeyInterface }
