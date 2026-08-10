# @use-compose/ui

## 0.10.0

### Minor Changes

- bf21d92: `YThemePicker` is now a working live theme editor instead of a read-only dump.

  - All six `YTheme` colours are editable (`dark` and `text` were missing), each
    writing through to the theme on change.
  - Added a curated set of design-token knobs — the scale roots for `border`,
    `spacing`, `radius` and `font`. Everything else in those categories derives
    from these through `calc()`, so these are the values worth tuning. Edits go
    straight to `:root`, persist across reloads, and are resettable individually
    or as a group.
  - `Randomize` works outside dev builds. It was wrapped in `import.meta.env.DEV`,
    so the button did nothing in any production or Storybook build.
  - New `showColors` / `showTokens` props to render either half on its own.

  `useToken` / `useTokens` were rewritten to support the above and to fix bugs that
  made them unusable:

  - `tokenTypes` returned the 24 top-level token categories instead of the types
    within the requested category, so `setToken` threw `Invalid token type` for
    every valid input.
  - `setToken` wrote the token's _name_ as its value — `--border-width-base: base`.
  - The composable touched `document.documentElement` during setup, which threw
    during SSR.

  They now expose the category's flattened leaves (`cssVar`, `defaultValue`, and a
  `kind` for picking a control) plus `setToken` / `resetToken` / `resetAll` /
  `valueOf` / `isOverridden`, all SSR-safe and persisted.

## 0.9.1

### Patch Changes

- 092d764: Removed two leftover `console.log` calls that fired in consumer applications: one
  in `useComposeTheme` on every colour resolution (so several times per theme
  change) and one in `useDropdown` on every setup. The package no longer logs
  anything at runtime.

  `setColorProperties` keeps its `useMode(modeRgb)` call. The return value is
  unused, but `culori/fn` is tree-shakeable and `oklch()` can only parse hex/rgb
  input once that mode is registered — without it every theme colour falls through
  to the "Invalid color provided" warning.

## 0.9.0

### Minor Changes

- 24bbf67: `AppCompose`'s `useBg` now paints a real background instead of setting a dead flag.

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

## 0.8.1

### Patch Changes

- dc9d18b: Move `express`, `compression` and `sirv` from `dependencies` to `devDependencies`. They are used only by `server.js`, the SSR dev/preview server, which is not published (the package ships `files: ["dist"]`). Consumers no longer install them transitively, which removes the `path-to-regexp`, `body-parser` and `qs` advisories from the published dependency tree.

## 0.8.0

### Minor Changes

- b507ab9: Cleanup styling, removal of duplicate causing heavy rendering and Tiptap package

## 0.7.0

### Minor Changes

- 68b7db0: Setup monorepo to init Tiptap package
