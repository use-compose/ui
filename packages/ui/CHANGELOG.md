# @use-compose/ui

## 0.8.1

### Patch Changes

- dc9d18b: Move `express`, `compression` and `sirv` from `dependencies` to `devDependencies`. They are used only by `server.js`, the SSR dev/preview server, which is not published (the package ships `files: ["dist"]`). Consumers no longer install them transitively, which removes the `path-to-regexp`, `body-parser` and `qs` advisories from the published dependency tree.

## 0.8.0

### Minor Changes

- b507ab9: Cleanup styling, removal of duplicate causing heavy rendering and Tiptap package

## 0.7.0

### Minor Changes

- 68b7db0: Setup monorepo to init Tiptap package
