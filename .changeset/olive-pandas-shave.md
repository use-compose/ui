---
'@use-compose/ui': minor
---

`YThemePicker` is now a working live theme editor instead of a read-only dump.

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
- `setToken` wrote the token's *name* as its value — `--border-width-base: base`.
- The composable touched `document.documentElement` during setup, which threw
  during SSR.

They now expose the category's flattened leaves (`cssVar`, `defaultValue`, and a
`kind` for picking a control) plus `setToken` / `resetToken` / `resetAll` /
`valueOf` / `isOverridden`, all SSR-safe and persisted.
