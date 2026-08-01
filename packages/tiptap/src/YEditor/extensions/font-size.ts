import { Editor, Mark, mergeAttributes } from '@tiptap/core'

const FONT_SIZES = ['rt-smaller', 'rt-small', 'rt-normal', 'rt-big', 'rt-bigger'] as const

type Size = (typeof FONT_SIZES)[number]

const FONT_SIZE_STYLES = {
  'rt-smaller': '0.75rem', // 12px
  'rt-small': '0.875rem', // 14px
  'rt-normal': '1rem', // 16px
  'rt-big': '1.375rem', // 22px
  'rt-bigger': '1.875rem' // 30px
}

function isSize(size: string): size is Size {
  return FONT_SIZES.includes(size as Size)
}

interface FontSizeOptions {
  sizes: Size[]
  getStyle: (size: Size) => string
  HTMLAttributes: Record<string, unknown>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    // All font-sizes are based on our design system, we overrides the default HTML behavior
    fontSize: {
      /**
       * Toggle the font size attribute
       */
      toggleFontSize: (attributes: { size: Size }) => ReturnType
    }
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const FontSize = Mark.create<FontSizeOptions>({
  name: 'font-size',

  addOptions() {
    return {
      sizes: ['rt-smaller', 'rt-small', 'rt-normal', 'rt-big', 'rt-bigger'],
      getStyle(size: Size) {
        const style = FONT_SIZE_STYLES[size]
        return `font-size: ${style}`
      },
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    return {
      size: {
        default: 'rt-normal',

        parseHTML: (element: HTMLElement) => element.getAttribute('class'),

        renderHTML: (attributes) => {
          if (!attributes.size) {
            return {}
          }

          const size: Size = attributes.size
          return {
            class: size,
            style: this.options.getStyle(size)
          }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        // https://github.com/ueberdosis/tiptap/discussions/2721
        priority: 51,
        getAttrs: (node: HTMLElement) => {
          return isSize(node.className) && null
        }
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      toggleFontSize:
        (attributes) =>
          ({ commands }: { commands: Editor['commands'] }) => {
            return commands.toggleMark(this.name, attributes)
          }
    }
  }
})

export { FONT_SIZES, FontSize, type Size }
