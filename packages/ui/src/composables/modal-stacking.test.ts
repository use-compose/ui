import { render } from '@testing-library/vue'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import YModal from '../components/YModal/YModal.vue'

const css = readFileSync(join(__dirname, '../components/YModal/YModal.css'), 'utf8')

/**
 * JS only tracks *position* in the stack (`stackIndex`, from `useStack`);
 * CSS turns that into an actual z-index via `--stack-index` on `.y-overlay`.
 * These tests pin that contract so a rename on either side fails loudly, and
 * cover the multi-modal case the arithmetic exists for.
 */
describe('modal stacking', () => {
  const cleanups: Array<() => Promise<void>> = []

  afterEach(async () => {
    // Modals only unregister from the (module-singleton) stack when their
    // `isVisible` watcher fires `false` — closing each one keeps state from
    // leaking into the next test.
    for (const close of cleanups.splice(0)) {
      await close()
    }
    document.body.innerHTML = ''
  })

  it('computes --dialog-z-index from --stack-index via CSS, not JS', () => {
    expect(css).toContain('--stack-index')
    expect(css).toMatch(
      /--dialog-z-index:\s*calc\(var\(--z-index-base\)\s*\+\s*var\(--stack-index,\s*0\)\s*\*\s*var\(--modal-stack-step\)\)/,
    )
  })

  it('gives each simultaneously-open modal a distinct, increasing --stack-index', async () => {
    const a = render(YModal, { props: { modelValue: true } })
    cleanups.push(async () => {
      await a.rerender({ modelValue: false })
    })
    await nextTick()

    const b = render(YModal, { props: { modelValue: true } })
    cleanups.push(async () => {
      await b.rerender({ modelValue: false })
    })
    await nextTick()

    const overlays = Array.from(document.querySelectorAll<HTMLElement>('.y-overlay'))
    expect(overlays).toHaveLength(2)

    const indices = overlays.map((el) => Number(el.style.getPropertyValue('--stack-index')))
    expect(indices[1]).toBe(indices[0] + 1)
  })

  it('drops back a slot when an earlier modal in the stack closes', async () => {
    const a = render(YModal, { props: { modelValue: true } })
    await nextTick()
    const b = render(YModal, { props: { modelValue: true } })
    cleanups.push(async () => {
      await b.rerender({ modelValue: false })
    })
    await nextTick()

    // v-show hides rather than removes, so both `.y-overlay` nodes stay in
    // the DOM after `a` closes — capture `b`'s specifically rather than
    // re-querying, which could just as easily match `a`'s (now stale) node.
    const bOverlay = document.querySelectorAll<HTMLElement>('.y-overlay')[1]

    await a.rerender({ modelValue: false })
    await nextTick()

    expect(bOverlay.style.getPropertyValue('--stack-index')).toBe('0')
  })
})
