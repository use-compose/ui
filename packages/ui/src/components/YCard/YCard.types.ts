export interface YCardProps {
  /** Small eyebrow label above the title, e.g. a category. */
  tag?: string
  /** Card title. Rendered as a real, focusable link when `href` is set —
   * the inclusive "block link" pattern: a stretched overlay makes the whole
   * card clickable through this one link. */
  title?: string
  href?: string
  /** Heading level for the title. */
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  /** Opts out of the clickable depth/shadow pop entirely. */
  flat?: boolean
}
