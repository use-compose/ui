import { render } from '@testing-library/vue'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { YDrawerSide, YModalSize, YModalType } from './types'
import { getModalClasses } from './utils/modal-classes'
import YModal from './YModal.vue'

const css = readFileSync(join(__dirname, 'YModal.css'), 'utf8')

/**
 * The animations were silently dead for a long time: `YOverlay` and `YModal`
 * render `<Transition name="fade">` / `name="drawer-slide"`, but no stylesheet
 * ever defined the classes Vue generates from those names. These tests pin the
 * contract so a rename on either side fails loudly.
 */
describe('modal motion', () => {
  function selectorFor(type: (typeof YModalType)[keyof typeof YModalType]) {
    return getModalClasses({ size: YModalSize.Medium, type })
      .split(' ')
      .filter(Boolean)
      .map((c) => `.${c}`)
      .join('')
  }

  it('defines every transition class Vue generates', () => {
    for (const name of [
      'fade-enter-from',
      'fade-leave-to',
      'fade-enter-active',
      'fade-leave-active',
      'drawer-slide-enter-from',
      'drawer-slide-leave-to',
      'drawer-slide-enter-active',
      'drawer-slide-leave-active',
    ]) {
      expect(css, `missing .${name}`).toContain(`.${name}`)
    }
  })

  it('targets the classes the components actually render', () => {
    const el = document.createElement('div')

    // Drawer: slides on `drawer-slide-*`.
    el.className = `${getModalClasses({ type: YModalType.Drawer })} drawer-slide-enter-from`
    expect(el.matches('.y-drawer.drawer-slide-enter-from')).toBe(true)

    // Default modal: fades on `fade-*`.
    el.className = `${getModalClasses({ type: YModalType.Default })} fade-leave-to`
    expect(el.matches('.y-modal.fade-leave-to')).toBe(true)

    // Full screen also fades.
    el.className = `${getModalClasses({ type: YModalType.FullScreen })} fade-enter-from`
    expect(el.matches('.y-full-screen-modal.fade-enter-from')).toBe(true)
  })

  it('styles every type `modalTypeClass` can produce', () => {
    for (const type of Object.values(YModalType)) {
      expect(css, `no rule for ${type}`).toContain(`${selectorFor(type).split('.').pop()}`)
    }
  })

  it('flips the drawer offset for the left variant', () => {
    expect(css).toMatch(/\.y-drawer-left[\s\S]*?--y-drawer-side:\s*-100%/)
    expect(css).toMatch(/\.y-drawer\b[\s\S]*?--y-drawer-side:\s*100%/)
    expect(css).toContain('transform: translateX(var(--y-drawer-side))')
  })

  it('exposes a framework-agnostic data-state hook', () => {
    const el = document.createElement('div')
    el.className = getModalClasses({ type: YModalType.Drawer })
    el.setAttribute('data-state', 'closed')
    expect(el.matches('.y-drawer[data-state="closed"]')).toBe(true)
    expect(css).toContain("[data-state='closed']")
  })

  /**
   * `YModal` renders a `Teleport` root, so Vue cannot pass a fallthrough
   * `class` down to the dialog — the side has to come from the `side` prop.
   */
  it.each([
    [YDrawerSide.Left, 'y-drawer-left'],
    [YDrawerSide.Right, 'y-drawer-right'],
    [undefined, 'y-drawer-right'],
  ])('renders %s as %s', (side, expected) => {
    document.body.innerHTML = ''
    render(YModal, { props: { modelValue: true, type: YModalType.Drawer, side } })
    expect(document.querySelector('.y-drawer')?.classList.contains(expected)).toBe(true)
  })

  it('does not add a side class to non-drawer modals', () => {
    document.body.innerHTML = ''
    render(YModal, { props: { modelValue: true, type: YModalType.Default } })
    expect(document.querySelector('.y-modal')?.className).not.toMatch(/y-drawer-/)
  })
})
