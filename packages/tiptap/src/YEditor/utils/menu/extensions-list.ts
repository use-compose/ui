import type { ChainedCommands, Editor } from '@tiptap/core'
import type { defineComponent } from 'vue'
import {
  PictosEditeurCitationIcon,
  PictosEditeurGrasIcon,
  PictosEditeurItaliqueIcon,
  PictosEditeurPucesIcon,
  PictosEditeurTitre1Icon,
  PictosEditeurTitre2Icon,
  PictosEditeurTraitIcon,
} from '../../compose-icons'
import YEditorButton from '../../YEditorButton.vue'

export interface MenuComponentProps {
  editor?: Editor
  command?: (() => boolean | void) | ChainedCommands | boolean
  isActive?: boolean
  tooltip?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

interface IconProps {
  color?: string
  stroke?: string
  strokeWidth?: string | number
  fill?: string
  size?: string
}

export interface MenuComponent {
  extension?: string
  name?: string
  isActive?: (value: unknown) => boolean | string
  command?: (value?: unknown) => void
  component: string
  icon?: string
  iconComponent?: ReturnType<typeof defineComponent<IconProps>>
  /** Plain string tooltip — i18n helper removed */
  tooltip?: string
  children?: MenuComponent[]
  componentProps?: ((editor: Editor) => MenuComponentProps) | MenuComponentProps
}

// defaultMenuComponentsMapping — commented out, Rt* UI components not available
export const defaultMenuComponentsMapping = {
  YEditorButton: YEditorButton,
  // 'RtEditorFontFamilyDropDown': RtEditorFontFamilyDropDown,
  // 'RtEditorFontSizeDropDown': RtEditorFontSizeDropDown,
  // 'RtEditorColorDropDown': RtEditorColorDropDown,
  // 'RtEditorAlignmentDropDown': RtEditorAlignmentDropDown,
  // 'RtEditorConditionalDropdownMenu': RtEditorConditionalDropdownMenu,
  // 'RtEditorImageButton': RtEditorImageButton,
  // 'RtEditorMenuGroup': RtEditorMenuGroup,
  // 'RtDivider': RtDivider,
  // 'RtEditorButton': RtEditorButton
}

export function resolveDynamicComponent(component: string) {
  const foundComponent =
    defaultMenuComponentsMapping[component as keyof typeof defaultMenuComponentsMapping]
  if (!foundComponent) {
    console.warn(`Component "${component}" not found in component list.`)
    return null
  }
  return foundComponent
}

const defaultComponent = 'YEditorButton'

/** Active subset — only StarterKit extensions that have a matching compose icon */
export const defaultMenuComponentsList = [
  'bold',
  'italic',
  'divider',
  'bulletList',
  'divider',
  'heading1',
  'heading2',
  'divider',
  'blockquote',
  'horizontalRule',
]

export const menuComponents: { [key: string]: MenuComponent } = {
  bold: {
    name: 'bold',
    icon: 'PictosEditeurGras',
    iconComponent: PictosEditeurGrasIcon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Bold',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    }),
  },
  italic: {
    name: 'italic',
    icon: 'PictosEditeurItalique',
    iconComponent: PictosEditeurItaliqueIcon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Italic',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    }),
  },
  bulletList: {
    name: 'bulletList',
    icon: 'PictosEditeurPuces',
    iconComponent: PictosEditeurPucesIcon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Bullet list',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    }),
  },
  heading1: {
    name: 'heading1',
    icon: 'PictosEditeurTitre1',
    iconComponent: PictosEditeurTitre1Icon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Heading 1',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
    }),
  },
  heading2: {
    name: 'heading2',
    icon: 'PictosEditeurTitre2',
    iconComponent: PictosEditeurTitre2Icon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Heading 2',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive('heading', { level: 2 }),
    }),
  },
  blockquote: {
    name: 'blockquote',
    icon: 'PictosEditeurCitation',
    iconComponent: PictosEditeurCitationIcon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Blockquote',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    }),
  },
  horizontalRule: {
    name: 'horizontalRule',
    icon: 'PictosEditeurTrait',
    iconComponent: PictosEditeurTraitIcon,
    extension: 'StarterKit',
    component: defaultComponent,
    tooltip: 'Horizontal rule',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
    }),
  },
  divider: {
    name: 'divider',
    component: 'RtDivider',
    componentProps: {
      class: 'rt-mx-0.5 rt-h-auto',
      orientation: 'vertical',
      color: 'neutral-300',
    },
  },

  // --- StarterKit items with no matching compose icon (comment until icons are added) ---
  // strike: { extension: 'StarterKit', ... }
  // orderedList: { extension: 'StarterKit', ... }
  // undo: { extension: 'StarterKit', ... }
  // redo: { extension: 'StarterKit', ... }
  // clear: { extension: 'StarterKit', ... }

  // --- Items that require extensions beyond StarterKit ---
  // heading (dropdown): { component: 'RtEditorHeadingDropDown', extension: 'Typography' }
  // fontFamily: { extension: 'FontFamily', component: 'RtEditorFontFamilyDropDown' }
  // fontSize: { extension: 'FontSize', component: 'RtEditorFontSizeDropDown' }
  // underline: { iconComponent: PictosEditeurSouligneIcon, extension: 'Underline' }
  // color: { extension: 'Color', component: 'RtEditorColorDropDown' }
  // alignment: { extension: 'TextAlign', component: 'RtEditorAlignmentDropDown' }
  // image: { iconComponent: PictosEditeurAjouterImageIcon, extension: 'StyledImage', component: 'RtEditorImageButton' }
  // link: { iconComponent: PictosEditeurAjouterLienIcon, extension: 'LinkMenu' }
  // options: { component: 'RtEditorConditionalDropdownMenu' }
  // group: { component: 'RtEditorMenuGroup' }
}
