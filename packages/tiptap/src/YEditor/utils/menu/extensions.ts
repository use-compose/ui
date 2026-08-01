import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
import { Image } from '@tiptap/extension-image'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Typography } from '@tiptap/extension-typography'
import { Underline } from '@tiptap/extension-underline'
import type { AnyExtension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { FontSize } from '../../extensions/font-size'
import { LinkMenu } from '../../extensions/link'
import { StyledImage } from '../../extensions/image'
import { menuComponents } from './extensions-list'

const extensionMap = {
  Color,
  FontFamily,
  Image,
  TextAlign,
  TextStyle,
  Typography,
  Underline,
  StarterKit,
  FontSize,
  LinkMenu,
  StyledImage,
}

const extensionConfig: Partial<Record<keyof typeof extensionMap, object>> = {
  StarterKit: {
    heading: { levels: [1, 2, 3] },
  },
  LinkMenu: {
    autolink: true,
    HTMLAttributes: { class: 'tiptap-link' },
  },
  TextAlign: {
    types: ['heading', 'paragraph'],
  },
}

export function buildExtensions(menuOptions: string[]): AnyExtension[] {
  const names = generateMenuExtensions(menuOptions)
  return names.map((name) => {
    const ext = extensionMap[name as keyof typeof extensionMap] as AnyExtension
    return ext.configure(extensionConfig[name as keyof typeof extensionMap] ?? {})
  })
}

export function generateMenuExtensions(extensionList: string[]): string[] {
  const result: string[] = []

  // TextStyle is required by Color and FontFamily
  result.push('TextStyle')

  extensionList = extensionList.filter((item) => item !== 'divider')

  for (const item of extensionList) {
    if (Array.isArray(item)) {
      result.push(...generateMenuExtensions(item as string[]))
    } else if (typeof item === 'string') {
      if (menuComponents[item]?.extension) {
        result.push(menuComponents[item].extension!)
      } else {
        // eslint-disable-next-line no-console
        console.warn(`Extension for "${item}" not found.`)
      }
    }
  }

  return [...new Set(result)]
}
