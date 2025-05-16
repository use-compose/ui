import { getValueFromRef } from '@/utils/get-value-from-ref'
import { onBeforeUnmount, onMounted, Ref, watchEffect } from 'vue'

export function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any,
) {
  function addEventListener() {
    const realTarget = getValueFromRef(target)
    console.log('📟 - realTarget → ', realTarget)
    console.log('📟 - realTarget instanceof EventTarget → ', realTarget instanceof EventTarget)
    if (realTarget instanceof EventTarget) {
      console.log('📟 - realTarget instanceof EventTarget → ', realTarget instanceof EventTarget)
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
  console.log('📟 - realTarget → ', realTarget)

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
