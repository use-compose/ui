// Must stay first: global.css declares `@layer tokens, base, theme, components,
// utilities`, and a layer's priority is fixed by where its name FIRST appears.
// If a component stylesheet were bundled ahead of this, `components` would be
// registered as the lowest-priority layer and lose to `theme` and `base`.
import './assets/css/global.css'

export * from './components'
export * from './composables'

export { Theme } from './types/theme'
export type { YTheme } from './types/theme'
export { isClientSide } from './utils/is-client-side'
