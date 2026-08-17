---
'@use-compose/ui': major
---

Adds `YChip`/`YChipGroup` for removable/selectable tags, and reworks `YCard` into a standalone
"block link" card:

- `YChip`: a clickable, toggleable chip (`aria-pressed`, keyboard-activatable) with an optional
  removable "x" (`removable`, emits `remove`) and a standalone `v-model:selected`.
- `YChipGroup`: single- or multi-select (`multiple`) coordinator over an array `v-model` —
  chips register their selection via `value` and read it back through provide/inject, following
  the same getter-based pattern `YList`/`YListItem` use.
- `YCard` **(breaking)**: no longer extends `ThemeComponentBaseProps` and drops all shared
  theming composables/`data-compose-ui` engine hookup — it's now a genuinely standalone
  component with its own props and plain `--y-card-*` CSS custom properties. New props: `tag`,
  `title`, `href`, `headingLevel`, `flat` (replaces the old `raw`). Implements the "block link"
  pattern from [Inclusive Components](https://inclusive-components.design/cards/) — the same one
  brutally-css's `.m-card` implements — via `title`+`href`, or hand-rolled with the
  `.y-card-link`/`.y-card-interactive` utility classes for full free-form control. The brutalist
  offset-shadow pop triggers specifically off the card's real link being hovered/focused (via
  `:has()`), not just the mouse being anywhere over the card, and text auto-inverts to solid
  white/black (whichever contrasts against `--y-card-bg-lightness`) while that pop is active.
  Also deletes `components/YCardHeader.vue`/`YCardFooter.vue`, fully commented-out dead stubs
  that weren't exported or used anywhere.
