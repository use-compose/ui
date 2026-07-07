export { default as YEditor } from './YEditor/YEditor.vue'
export { default as YEditorButton } from './YEditor/YEditorButton.vue'

// Extensions
export { FontSize, FONT_SIZES, type Size } from './YEditor/extensions/font-size'
export { StyledImage } from './YEditor/extensions/image'
export { LinkMenu } from './YEditor/extensions/link'

// Menu utilities
export { buildExtensions, generateMenuExtensions } from './YEditor/utils/menu/extensions'
export { menuComponents, defaultMenuComponentsList } from './YEditor/utils/menu/extensions-list'
export type { MenuComponent, MenuComponentProps } from './YEditor/utils/menu/extensions-list'

// Color components (for custom integration)
export { default as YEditorColorDropDown } from './YEditor/menu/color/YEditorColorDropDown.vue'
export { default as YEditorColorCircle } from './YEditor/menu/color/YEditorColorCircle.vue'
export { default as YEditorMultiColorCircle } from './YEditor/menu/color/YEditorMultiColorCircle.vue'

// Link components
export { default as YEditorLinkFloatingMenu } from './YEditor/menu/link/YEditorLinkFloatingMenu.vue'

// Types
export type { Color } from './YEditor/types/color.type'
export type { DropdownInterface } from './YEditor/types/dropdown.interface'

import './assets/css/main.css'
