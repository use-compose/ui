---
'@use-compose/ui': minor
---

Re-added the old root-level timeline as a working component, `YTimeline` + `YTimelineItem`.

It had been stranded at the repo root in `src/components/YList` since the monorepo move and was
never exported from the package. The old version was also mis-shaped: it was named `YList` but
rendered a single timeline item, and required the caller to pass `index` and `lastIndex` by hand.

- `YTimeline` renders the `<ul>`/`<ol>`; `YTimelineItem` renders one item. An item's position in
  the rail is now read from the DOM with `:first-child` / `:last-child`, so `index` and
  `lastIndex` are gone from the public API.
- Replaced the `<style scoped>` block with a `YTimeline.css` / `YTimelineItem.css` pair in the
  `components` layer, with flat kebab-case classes (`.y-timeline-marker`, `.y-timeline-body`,
  etc.) rather than BEM, and dropped references to custom properties and classes that no longer
  exist (`--color-white`, `--color-black`, `.font-gotham`, `.text-9`, `.display-flex`). Geometry
  is tunable through `--y-timeline-*` custom properties.
- Rail and dot colour default to a semantic token rather than `--theme-current-color`, which is
  only defined inside `[data-compose-ui='block']` and so resolved to nothing here — taking the
  whole `border-left` shorthand down with it and leaving the rail invisible. `YTimeline` wires up
  `color`/`variant` through the shared `useColor`/`useVariant` composables (`.primary` /
  `.secondary` / `.danger` on `.y-timeline`) without adding `data-compose-ui="block"`, since a
  rail isn't a clickable block and that attribute is what turns on the shared engine's
  interactive shadow/transform styling.
- The list reserves padding for its markers, which hang into negative x and previously relied on
  a padded ancestor to avoid being clipped.
- Item state classes are `is-highlighted` / `is-collapsible` / `is-open`. A bare `highlighted`
  collided with `YHighlightedText`'s global `.highlighted` rule and uppercased the item's
  description.
- Collapsing is now an explicit `collapsible` prop on the list instead of a `window.innerWidth`
  check inside the click handler, which never re-evaluated on resize. The toggle is a real button
  with `aria-expanded` and `aria-controls`, and is omitted when an item has nothing to reveal.
- `YTimelineItem` fixes the title's `level="h3"` (not a prop on `YHighlightedText`) with a
  `headingLevel` prop, and renders its default slot as the description so items can carry markup.
