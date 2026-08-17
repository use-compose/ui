# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

`@use-compose/monorepo` — a pnpm workspace publishing Vue 3 component libraries. See
`../CLAUDE.md` for how this repo relates to its siblings under `www/packages/`.

## Workspace layout

- `packages/ui` — published as **`@use-compose/ui`**, the main component library
- `packages/tiptap` — published as **`@use-compose/tiptap`**, a Tiptap editor extension set
- `apps/docs` — **`@use-compose/docs`**, the Storybook app documenting `packages/ui`
  (`pnpm storybook`), deployed at `https://ui.use-compose.com/`

## Theming architecture (`packages/ui`)

Runtime CSS custom properties in the OKLCH color space, generated from one base theme object
(`primary`/`secondary`/`background`/`dark`/`danger`/`text`) via `style-dictionary`
(`tokens:build`). Consumers wrap their app root in `<AppCompose :theme="myTheme">` and read/set
the theme through `useTheme()`. The `compose-ui` CSS layer
(`packages/ui/src/assets/css/theme/compose-ui/`) uses an `@property` enum→bits "type grinding"
trick to drive color/variant/state purely in CSS — the same lineage as the space-toggle and
`:has()`-driven techniques prototyped in the sibling R&D repo
`/home/macbookpro/www/css/brutally-css`. When reducing JS in this repo (an explicit long-term
goal — see memory `reduce-js-via-css-tricks-from-brutally-css`), read that repo's source
directly rather than working from a summary; the target shape is "JS sets one thin state
signal, CSS owns everything downstream."

## Component conventions

Hand-authored components (not the hygen generator's inline-type output — see below) follow this
file layout, e.g. `components/YTag/`:

- `<Name>.types.ts` — `<Name>Props extends ThemeComponentBaseProps` (adds `raw`/`size`/`color`/
  `variant`/`state`), plus any injection keys for group/coordinator components
- `<Name>.vue` — theming via `useVariant`/`useState`/`useColor`/`useSize`/`useRaw` from
  `@/composables` (or the `useComponentTheme` aggregator), composed into one classes computed
- `<Name>.css` — plain (non-scoped) CSS wrapped in `@layer components`; only kebab-case class
  selectors pass stylelint (`selector-class-pattern`) — no BEM double-underscore names
- `<Name>.stories.ts` — via `useThemeComponentStory` for the common variant/size/color/state
  controls, plus dedicated stories for anything component-specific
- `<Name>.test.ts` — `@testing-library/vue`, `render()` + snapshot plus behavior assertions

`pnpm new:component` (hygen, `_templates/new/component/`) scaffolds a starting point but inlines
the props type into the `.vue` file instead of a separate `.types.ts` — extract it to match the
convention above rather than leaving it inline.

Group/coordinator components (e.g. `YChipGroup`, `YList`) `provide()` state through **functions
or getters that read reactive props at call time**, not a captured snapshot — otherwise injected
children go stale. Children `inject()` with a fallback default so they still work standalone
outside a group (see `YListItem`, `YChip`).

`state="disabled"` (part of the shared theming vocabulary) is how components express a disabled
look/behavior — don't add a separate `disabled` boolean prop.

**`YCard` is a deliberate exception** to the conventions above: no `ThemeComponentBaseProps`, no
theming composables, no `data-compose-ui` engine hookup — own props, own plain CSS custom
properties (`--y-card-*`), own `:has()`-driven interaction. This was an explicit choice (not an
oversight) to have one genuinely standalone, drop-in component in the library, and to sidestep
cascade-layer conflicts with the shared engine's own `transform`/`box-shadow`/`color`
declarations on `[data-compose-ui='block']`. Don't "fix" it back onto the shared engine.

## Publishing

Changesets (`pnpm changeset`) → merge → GitHub Actions (`changeset-release.yml`) → **npm OIDC
trusted publishing**. There is no `NPM_TOKEN` in play (deliberately commented out in the
workflow) — never manually `npm publish` or uncomment token auth. The authorizing config lives
on npmjs.com per package (org `use-compose`, repo `ui`), not in this repo.

## Consumers

`arthurplazanet.com` (in the sibling `www/portfolio/` repo family) depends on `@use-compose/ui`
as a plain version-pinned npm dependency (not a workspace link) — changes here only reach it
once published and the site's `package.json` is bumped.
