import type { Editor } from '@tiptap/core'
import type { defineComponent } from 'vue'
import {
  PictosEditeurAjouterImageIcon,
  PictosEditeurAjouterLienIcon,
  PictosEditeurCitationIcon,
  PictosEditeurGrasIcon,
  PictosEditeurItaliqueIcon,
  PictosEditeurPucesIcon,
  PictosEditeurSouligneIcon,
  PictosEditeurTitre1Icon,
  PictosEditeurTitre2Icon,
  PictosEditeurTraitIcon,
} from '../../compose-icons'
import YEditorButton from '../../YEditorButton.vue'
import YEditorAlignmentDropDown from '../../menu/YEditorAlignmentDropDown.vue'
import YEditorFontFamilyDropDown from '../../menu/YEditorFontFamilyDropDown.vue'
import YEditorFontSizeDropDown from '../../menu/YEditorFontSizeDropDown.vue'
import YEditorHeadingDropDown from '../../menu/YEditorHeadingDropDown.vue'
import YEditorColorDropDown from '../../menu/color/YEditorColorDropDown.vue'
import YEditorImageButton from '../../menu/image/YEditorImageButton.vue'

interface IconProps {
  color?: string
  stroke?: string
  strokeWidth?: string | number
  fill?: string
  size?: string
}

export interface MenuComponentProps {
  editor?: Editor
  command?: (() => boolean | void) | boolean
  isActive?: boolean
  tooltip?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any
}

export interface MenuComponent {
  extension?: string
  name?: string
  component: string
  icon?: string
  iconComponent?: ReturnType<typeof defineComponent<IconProps>>
  tooltip?: string
  children?: MenuComponent[]
  componentProps?: ((editor: Editor) => MenuComponentProps) | MenuComponentProps
}

export const defaultMenuComponentsMapping = {
  YEditorButton,
  YEditorAlignmentDropDown,
  YEditorFontFamilyDropDown,
  YEditorFontSizeDropDown,
  YEditorHeadingDropDown,
  YEditorColorDropDown,
  YEditorImageButton,
}

export function resolveDynamicComponent(component: string) {
  const found = defaultMenuComponentsMapping[component as keyof typeof defaultMenuComponentsMapping]
  if (!found) {
    // eslint-disable-next-line no-console
    console.warn(`Component "${component}" not found.`)
    return null
  }
  return found
}

const btn = 'YEditorButton'

export const defaultMenuComponentsList = [
  'heading',
  'fontFamily',
  'divider',
  'bold',
  'italic',
  'underline',
  'divider',
  'color',
  'alignment',
  'divider',
  'bulletList',
  'orderedList',
  'image',
  'link',
  'divider',
  'blockquote',
  'horizontalRule',
]

export const menuComponents: Record<string, MenuComponent> = {
  heading: {
    name: 'heading',
    component: 'YEditorHeadingDropDown',
    extension: 'Typography',
    tooltip: 'Heading',
  },
  fontFamily: {
    name: 'font-family',
    component: 'YEditorFontFamilyDropDown',
    extension: 'FontFamily',
    tooltip: 'Font family',
  },
  fontSize: {
    name: 'font-size',
    component: 'YEditorFontSizeDropDown',
    extension: 'FontSize',
    tooltip: 'Font size',
  },
  bold: {
    name: 'bold',
    icon: 'PictosEditeurGras',
    iconComponent: PictosEditeurGrasIcon,
    extension: 'StarterKit',
    component: btn,
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
    component: btn,
    tooltip: 'Italic',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    }),
  },
  underline: {
    name: 'underline',
    icon: 'PictosEditeurSouligne',
    iconComponent: PictosEditeurSouligneIcon,
    extension: 'Underline',
    component: btn,
    tooltip: 'Underline',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive('underline'),
    }),
  },
  color: {
    name: 'color',
    extension: 'Color',
    component: 'YEditorColorDropDown',
    tooltip: 'Color',
  },
  alignment: {
    name: 'alignment',
    extension: 'TextAlign',
    component: 'YEditorAlignmentDropDown',
    tooltip: 'Alignment',
  },
  image: {
    name: 'image',
    icon: 'PictosEditeurAjouterImage',
    iconComponent: PictosEditeurAjouterImageIcon,
    extension: 'StyledImage',
    component: 'YEditorImageButton',
    tooltip: 'Image',
  },
  link: {
    name: 'linkMenu',
    icon: 'PictosEditeurAjouterLien',
    iconComponent: PictosEditeurAjouterLienIcon,
    extension: 'LinkMenu',
    component: btn,
    tooltip: 'Link',
    componentProps: (editor: Editor) => ({
      isActive: editor.isActive('linkMenu'),
      command: () => editor.commands.toggleLinkMenu(),
    }),
  },
  bulletList: {
    name: 'bulletList',
    icon: 'PictosEditeurPuces',
    iconComponent: PictosEditeurPucesIcon,
    extension: 'StarterKit',
    component: btn,
    tooltip: 'Bullet list',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    }),
  },
  orderedList: {
    name: 'orderedList',
    extension: 'StarterKit',
    component: btn,
    tooltip: 'Ordered list',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    }),
  },
  heading1: {
    name: 'heading1',
    icon: 'PictosEditeurTitre1',
    iconComponent: PictosEditeurTitre1Icon,
    extension: 'StarterKit',
    component: btn,
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
    component: btn,
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
    component: btn,
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
    component: btn,
    tooltip: 'Horizontal rule',
    componentProps: (editor: Editor) => ({
      command: () => editor.chain().focus().setHorizontalRule().run(),
      isActive: false,
    }),
  },
  divider: {
    name: 'divider',
    component: 'YEditorDivider',
  },
}
