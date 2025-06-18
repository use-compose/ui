import { getValueFromRef } from '@/utils/get-value-from-ref'
import { onMounted, ref, TemplateRef, watch } from 'vue'

export function useChangedEvent(target: TemplateRef<EventTarget | null>) {
  const hasChangedOnce = ref(false)
  let element: { $el: HTMLElement | undefined } | null = null

  onMounted(() => {
    element = target.value as unknown as { $el: HTMLElement | undefined }
    if (!element || !element.$el) {
      // eslint-disable-next-line no-console
      console.warn('📟 - element is undefined or null', element)
      return
    }
    element.$el.style.setProperty('--has-changed-once', 'none')
  })
  // useEventListener(targetValue, 'change', hasTargetChanged)

  watch(
    () => hasChangedOnce.value,
    (newVal) => {
      if (!element || !element.$el) {
        // eslint-disable-next-line no-console
        console.warn('📟 - element is undefined or null', element)
        return
      }
      if (newVal) {
        element.$el.style.removeProperty('--has-changed-once')
      }
    },
  )
  return {
    hasChangedOnce,
  }
}

export function useHoverEvent(target: TemplateRef<EventTarget | null>) {
  const isHoveredOnce = ref(false)

  let element: { $el: HTMLElement | undefined } | HTMLElement | null = null

  onMounted(() => {
    element = getValueFromRef(target) as unknown as HTMLElement
    if (!element) {
      // eslint-disable-next-line no-console
      console.warn('📟 - element is undefined or null', element)
      return
    }
    if (element && element.hasAttribute('$el') ? false : true) {
      // eslint-disable-next-line no-console
      console.warn('📟 - element.$el is undefined or null', element)
    }
    element.style.setProperty('--is-not-hovered-yet', '1')
  })

  watch(
    () => isHoveredOnce.value,
    (newVal) => {
      if (!element) {
        // eslint-disable-next-line no-console
        console.warn('📟 - element is undefined or null', element)
        return
      }
      if (newVal) {
        ;(element as HTMLElement).style.setProperty('--is-not-hovered-yet', '0')
      }
    },
  )
  return {
    isHoveredOnce,
  }
}

export function useAnimation(target: TemplateRef<EventTarget | null>) {
  const { hasChangedOnce } = useChangedEvent(target)
  const isClickedOnce = ref(false)
  const { isHoveredOnce } = useHoverEvent(target)

  return {
    isClickedOnce,
    isHoveredOnce,
    hasChangedOnce,
  }
}
