---
'@use-compose/ui': minor
---

`AppCompose`'s `useBg` now paints a real background instead of setting a dead flag.

It still accepts `true` (the theme background, `--color-bg`), and now also accepts a
background token — `'info'`, `'accent'`, `'elevated'`, … with an optional `bg-` /
`color-bg-` prefix — a custom property (`'--my-surface'`), or any plain CSS color.
The resolver is exported as `resolveComposeBg`, with `COMPOSE_BG_TOKENS` /
`ComposeBgToken` for the token list.

Export and cascade fixes:

- `YTable`, `YTableBody`, `YTableRow`, `YTableHeader`, `YTableDataCell` and
  `YTableFooter` are now exported — the `YTable` barrel pointed at file paths that
  did not exist, so the whole subtree was left out of the public entry.
- `YTag`, `YLabel`, `YMenu`, `YParallax`, `YSkeleton`, `YDropdownTrigger` and
  `CloseIcon` are now exported.
- `ModalProvider` is no longer re-exported from two barrels, which made it an
  ambiguous star export.
- Component prop types (`YButtonProps`, `YTableProps`, `WrapperProps`, …) are now
  re-exported alongside their components.
- `global.css` is imported first from the package entry so the
  `@layer tokens, base, theme, components, utilities` order is registered before any
  component stylesheet. Previously a component stylesheet could register
  `components` first and sink it below `theme` and `base`.
- `AppCompose.css` and `YInputText.css` were never imported and are now included.
- Removed duplicate `components/AppCompose.vue` and `components/Wrapper.vue`; the
  stale `Wrapper.vue` copy used by `YSection` was missing its stylesheet import.
- `package.json` `exports`: `./package.json` and `./components` pointed at files
  that are not emitted into `dist`.
- `YSkeleton` no longer ships an unlayered `<style>` block. It was outranking every
  layered rule in the package — including its own `YSkeleton.css` — and wrote
  `--border-color`, `--animation-duration`, `--skeleton-base` and
  `--skeleton-highlight` onto the global `:root`. The styles moved into
  `YSkeleton.css` under `@layer components`, and the variables are now namespaced
  (`--y-skeleton-*`) and scoped to `.skeleton-container`. Override them there.
  The shimmer's `left: -var(…)` was invalid CSS and never applied; the highlight
  now sweeps the full placeholder and respects `prefers-reduced-motion`.
- `CloseIcon`'s scoped `<style>` is layered too, so nothing in the package sits
  outside the cascade layers any more.
