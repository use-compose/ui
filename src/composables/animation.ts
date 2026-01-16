import { findHTMLElement } from '@/utils/find-html-element-from-template-ref'
import { MaybeRefOrGetter, onMounted, ref, unref, watch } from 'vue'

export const animationEvents = ['changed', 'hovered'] as const
export type AnimationEvent = (typeof animationEvents)[number]

type Domish = HTMLElement | { el?: unknown } | { $el?: unknown } | null | undefined

function resolveEl(source: MaybeRefOrGetter<Domish>) {
  const v = typeof source === 'function' ? source() : unref(source)
  return findHTMLElement(v)
}

// const animationEventsVars: { [key in AnimationEvent]: string } = {
//   changed: '--has-changed-once',
//   hovered: '--is-not-hovered-yet',
// }

export function useChangedEvent(target: MaybeRefOrGetter<Domish>) {
  const hasChangedOnce = ref(false)
  // let element: { $el: HTMLElement | undefined } | null = null
  let element: HTMLElement | null = null

  onMounted(() => {
    element = resolveEl(target)

    // element = target.value as unknown as { $el: HTMLElement | undefined }
    if (!element) {
      // eslint-disable-next-line no-console
      console.warn('📟 - element is undefined or null', element)
      return
    }
    element.style.setProperty('--has-changed-once', 'none')
  })
  // useEventListener(targetValue, 'change', hasTargetChanged)

  watch(
    () => hasChangedOnce.value,
    (newVal) => {
      if (!element) {
        // eslint-disable-next-line no-console
        console.warn('📟 - element is undefined or null', element)
        return
      }
      if (newVal) {
        element.style.removeProperty('--has-changed-once')
      }
    },
  )
  return {
    hasChangedOnce,
  }
}

export function useHoverEvent(target: MaybeRefOrGetter<Domish>) {
  const isHoveredOnce = ref(false)

  let element: HTMLElement | null = null

  onMounted(() => {
    element = resolveEl(target)
    if (!element) {
      // eslint-disable-next-line no-console
      console.warn('📟 - element is undefined or null', element)
      return
    }
    element.style.setProperty('--is-not-hovered-yet', 'none')
  })

  watch(
    () => isHoveredOnce.value,
    (newVal) => {
      if (!element) {
        // eslint-disable-next-line no-console
        console.warn('📟 - element is undefined or null', element)
        return
      }
      if (newVal && element instanceof HTMLElement) {
        element.style.removeProperty('--has-changed-once')
      }
    },
  )
  return {
    isHoveredOnce,
  }
}

export function useAnimation(target: MaybeRefOrGetter<Domish>) {
  const { hasChangedOnce } = useChangedEvent(target)
  const isClickedOnce = ref(false)
  const { isHoveredOnce } = useHoverEvent(target)

  return {
    isClickedOnce,
    isHoveredOnce,
    hasChangedOnce,
  }
}
