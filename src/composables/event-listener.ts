import { getValueFromRef } from '@/utils/get-value-from-ref'
import { onBeforeUnmount, onMounted, Ref, watchEffect } from 'vue'

export function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => void,
) {
  function addEventListener() {
    const realTarget = getValueFromRef(target)
    if (realTarget instanceof EventTarget) {
      realTarget.addEventListener(event, handler)
    }
  }

  function removeEventListener() {
    const realTarget = getValueFromRef(target)
    if (realTarget instanceof EventTarget) {
      realTarget.removeEventListener(event, handler)
    }
  }

  onMounted(addEventListener)

  onBeforeUnmount(removeEventListener)

  const realTarget = getValueFromRef(target)

  // Watch for changes to the target and update the listener accordingly
  watchEffect(
    () => {
      if (realTarget) {
        removeEventListener()
      }
      addEventListener()
    },
    { flush: 'post' },
  )
}
