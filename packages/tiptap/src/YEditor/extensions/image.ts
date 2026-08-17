import { Image as TiptapImage } from '@tiptap/extension-image'

 
const StyledImage = TiptapImage.extend({
  name: 'styledImage',

  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        style: 'max-width: 100%; height: auto; display: block;',
        class: 'tiptap-img'
      }
    }
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      href: {
        default: null,
        parseHTML: (element) => element.closest('a')?.getAttribute('href') || null,
        renderHTML: (attributes) => {
          if (!attributes.href) {
            return {}
          }
          return {
            href: attributes.href
          }
        }
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'a[href] img',
        getAttrs: (dom) => {
          const img = dom.tagName === 'IMG' ? dom : dom.querySelector('img')
          return {
            src: img?.getAttribute('src'),
            href: dom.getAttribute('href')
          }
        }
      },
      {
        tag: 'img[src]',
        getAttrs: (dom) => ({
          src: dom.getAttribute('src')
        })
      }
    ]
  },
  renderHTML({ node, HTMLAttributes }) {
    const { src, href } = node.attrs

    const imgAttributes = {
      ...this.options.HTMLAttributes,
      ...HTMLAttributes,
      src
    }

    if (href) {
      return ['a', { href, target: '_blank' }, ['img', imgAttributes]]
    }

    return ['img', imgAttributes]
  }
})

export { StyledImage }
