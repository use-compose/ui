---
'@use-compose/ui': patch
---

Fixed a `stylelint` error in `YParallax.css` (`declaration-block-no-redundant-longhand-properties`) by collapsing `overflow-x: hidden; overflow-y: auto;` into the shorthand `overflow: hidden auto;`. No behavior change.
