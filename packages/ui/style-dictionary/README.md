# Style Dictionary pipeline (archived)

Token generation has moved to
[`arthu-pr/unholy-design-tokens`](https://github.com/arthu-pr/unholy-design-tokens).

The `style-dictionary` dependency and the `build:style` script were removed from
`packages/ui` because the package carried a high-severity prototype-pollution
advisory (GHSA in `convertTokenData`) and pulled two more vulnerable transitives
(`tmp`, `qs`), while nothing in `pnpm build` or in any CI workflow ran it.

**The generated output is still live.** `src/assets/css/theme/**` and
`generated/` are committed and imported by `src/composables/use-theme-tokens.ts`
and `src/components/utils.ts`. Do not delete them.

## Why this directory still exists

The token sources here are *not* fully mirrored upstream yet. Most files are
byte-identical to `unholy-design-tokens/src/tokens/`, but two are not:

- `tokens/base/color-oklch.json` — holds the tuned OKLCH brand values
  (primary `L 0.759 / C 0.121 / H 250`, secondary, danger, accent). The upstream
  counterpart `custom/OKlch/color.json` is a zeroed placeholder.
- `tokens/conditional.json` — diverged from the upstream copy.

Also without an obvious upstream counterpart: `tokens/base/transform.json`,
`tokens/base/typography.json`, `tokens/color.json`, `tokens/state.json`,
`tokens/variant.json`.

Port these upstream before deleting this directory. Once upstream is the single
source of truth, the whole folder can go; the pipeline code (`config.js`,
`parsers/`, `formatters/`, `filters/`, `transforms/`) is already inert since the
`style-dictionary` dependency is gone.
