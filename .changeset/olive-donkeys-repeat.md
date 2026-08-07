---
'@use-compose/ui': patch
---

Removed two leftover `console.log` calls that fired in consumer applications: one
in `useComposeTheme` on every colour resolution (so several times per theme
change) and one in `useDropdown` on every setup. The package no longer logs
anything at runtime.

`setColorProperties` keeps its `useMode(modeRgb)` call. The return value is
unused, but `culori/fn` is tree-shakeable and `oklch()` can only parse hex/rgb
input once that mode is registered — without it every theme colour falls through
to the "Invalid color provided" warning.
