---
'@use-compose/ui': patch
---

Move `express`, `compression` and `sirv` from `dependencies` to `devDependencies`. They are used only by `server.js`, the SSR dev/preview server, which is not published (the package ships `files: ["dist"]`). Consumers no longer install them transitively, which removes the `path-to-regexp`, `body-parser` and `qs` advisories from the published dependency tree.
