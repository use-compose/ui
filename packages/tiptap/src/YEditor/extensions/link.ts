import { Editor, getMarkRange } from '@tiptap/core'
import { Link as TiptapLink } from '@tiptap/extension-link'
import { MarkType, ResolvedPos } from '@tiptap/pm/model'
import { NodeSelection, Plugin } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkMenu: {
      /**
       * Toggle the link floating menu
       */
      toggleLinkMenu: () => ReturnType
      /**
       * Save the link from the link menu
       */
      saveLink: (link: string, linkText?: string) => ReturnType
      /**
       * Remove the link from the link menu
       */
      removeLink: () => ReturnType
      /**
       * Allow edition mode in the link menu
       */
      setEditMode: () => ReturnType
      /**
       * Hide the link menu
       */
      hideMenu: () => void
      /**
       * Set link text when editing an existing link
       */
      setLinkText: (linkText?: string) => ReturnType
    }
  }
}

// https://discuss.prosemirror.net/t/expanding-the-selection-to-the-active-mark/478
function linkAround(linkMark: MarkType, $from: ResolvedPos) {
  const { parent, parentOffset } = $from
  const start = parent.childAfter(parentOffset)
  if (!start.node) return null

  let startIndex = $from.index()
  let startPos = $from.start() + start.offset
  let endIndex = startIndex + 1
  let endPos = startPos + start.node.nodeSize
  while (startIndex > 0 && linkMark.isInSet(parent.child(startIndex - 1).marks)) {
    startIndex -= 1
    startPos -= parent.child(startIndex).nodeSize
  }
  while (endIndex < parent.childCount && linkMark.isInSet(parent.child(endIndex).marks)) {
    endPos += parent.child(endIndex).nodeSize
    endIndex += 1
  }
  return { from: startPos, to: endPos }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const LinkMenu = TiptapLink.extend({
  name: 'linkMenu',
  // https://github.com/ueberdosis/tiptap/issues/2571
  inclusive: false,

  addStorage() {
    return {
      isMenuVisible: false,
      menuPosition: { top: 0, left: 0, bottom: 0 },
      isExistingLink: false,
      isEditMode: false,
      link: '',
      linkText: ''
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          /*
           * TODO-TICKET: https://www.notion.so/reteach/Add-Link-Button-85cd0e724b7144d595c1a4f499ac4682?pvs=4
           * Using handleClick from ProseMirror gives direct access to the resolved position,
           * avoiding the extra posAtCoords() call we used to make from clientX/Y.
           */
          handleClick(view: EditorView, pos: number, event: Event) {
            const { schema, doc } = view.state
            const resolvedPos = doc.resolve(pos)
            const node = resolvedPos.nodeAfter || resolvedPos.nodeBefore

            if (node?.type?.name === 'styledImage') {
              const imgElement = event.target as HTMLElement
              imgElement.style.border = '2px solid #5B76FB'
              imgElement.style.padding = '1px'
              imgElement.style.borderRadius = '2px'
              imgElement.style.backgroundColor = 'white'
              return true
            }

            const range = getMarkRange(resolvedPos, schema.marks.linkMenu)
            return !!range
          }
        }
      })
    ]
  },

  onSelectionUpdate() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editor: Editor = (this as any).editor
    const { state } = editor
    const { $from, anchor, empty } = state.selection
    const linkMark = state.schema.marks.linkMenu

    if (state.selection instanceof NodeSelection) {
      const { node } = state.selection
      if (node?.type?.name === 'styledImage' && node?.attrs?.href) {
        const storage = editor.storage.linkMenu
        if (storage.isMenuVisible) return
        storage.link = node.attrs.href
        storage.linkText = node.attrs.href
        storage.isExistingLink = true
        editor.commands.toggleLinkMenu()
        return
      }
    }

    // Cache the mark range — used both for the active check and to get link text
    const range = getMarkRange(state.doc.resolve(anchor), linkMark)

    // Only show menu on cursor click (empty selection), not on text selection
    if (!empty) return

    const isLinkActive = !!linkMark.isInSet(state.storedMarks || $from.marks())

    if (isLinkActive && range) {
      const linkAroundPos = linkAround(linkMark, $from)
      const linkText = linkAroundPos
        ? state.doc.textBetween(linkAroundPos.from, linkAroundPos.to, ' ')
        : ($from.parent.childAfter($from.parentOffset).node?.textContent ?? '')

      const storage = editor.storage.linkMenu
      if (storage.isMenuVisible) return
      storage.isExistingLink = true
      storage.link = editor.getAttributes('linkMenu').href
      storage.linkText = linkText
      editor.commands.toggleLinkMenu()
    }
  },

  addCommands() {
    return {
      ...this.parent?.(),
      toggleLinkMenu:
        () =>
          ({ editor }: { editor: Editor }) => {
            const editorDomRect = editor.view.dom.getBoundingClientRect()
            const { from } = editor.state.selection
            const cursorCoords = editor.view.coordsAtPos(from)

            // Extra padding to fix scrollbar + floating menu padding
            const top = `${cursorCoords.bottom - editorDomRect.top + 24}px`
            const left = `${cursorCoords.left - editorDomRect.left + 20}px`

            const storage = editor.storage.linkMenu

            if (storage.isMenuVisible) {
              storage.isMenuVisible = false
              storage.isExistingLink = false
              storage.link = ''
              storage.linkText = ''
              return true
            }
            storage.isMenuVisible = true
            storage.menuPosition = { top, left }
            return true
          },

      saveLink:
        (link, linkText?: string) =>
          ({ editor, chain }: { editor: Editor; chain: Editor['chain'] }) => {
            const storage = editor.storage.linkMenu
            const { selection, tr } = editor.state
            const { anchor } = selection
            const range = getMarkRange(editor.state.doc.resolve(anchor), editor.state.schema.marks.linkMenu)

            if (selection instanceof NodeSelection && selection.node.type.name === 'styledImage') {
              editor.view.dispatch(
                tr.setNodeMarkup(selection.from, undefined, {
                  ...selection.node.attrs,
                  href: link
                })
              )
            }

            if (!storage.isExistingLink) {
              chain().setLink({ href: link }).focus().run()
            } else if (range) {
              // https://github.com/ueberdosis/tiptap/issues/373#issuecomment-906736054
              chain()
                .setLink({ href: link })
                .command(({ tr }) => {
                  tr.insertText(linkText || link, range.from, range.to)
                  return true
                })
                .focus()
                .run()
            }

            storage.isMenuVisible = false
            storage.isExistingLink = false
            storage.isEditMode = false
            storage.link = ''
            storage.linkText = ''

            return true
          },

      removeLink:
        () =>
          ({ editor, chain }: { editor: Editor; chain: Editor['chain'] }) => {
            const storage = editor.storage.linkMenu
            storage.isMenuVisible = false
            storage.isExistingLink = false
            storage.link = ''
            storage.linkText = ''
            chain().unsetLink().focus().run()
            return true
          },

      setEditMode:
        () =>
          ({ editor }: { editor: Editor }) => {
            editor.storage.linkMenu.isEditMode = true
            return true
          },

      hideMenu:
        () =>
          ({ editor }: { editor: Editor }) => {
            const storage = editor.storage.linkMenu
            storage.isMenuVisible = false
            storage.isExistingLink = false
            storage.isEditMode = false
            storage.link = ''
            storage.linkText = ''
            return true
          },

      setLinkText:
        (linkText?: string) =>
          ({ editor, chain }: { editor: Editor; chain: Editor['chain'] }) => {
            const { anchor } = editor.state.selection
            const range = getMarkRange(editor.state.doc.resolve(anchor), editor.state.schema.marks.linkMenu)

            if (range) {
              const storage = editor.storage.linkMenu
              chain()
                .unsetMark('linkMenu')
                .setLink({ href: storage.link })
                .command(({ tr }) => {
                  tr.insertText(linkText || '', range.from, range.to)
                  return true
                })
                .run()
              storage.linkText = linkText || ''
            }

            return true
          }
    }
  }
})

export { LinkMenu }
