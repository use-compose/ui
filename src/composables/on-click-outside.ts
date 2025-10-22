import { Ref, unref } from 'vue'
import { useEventListener } from './event-listener'

export function useOnClickOutside(
  target: Ref<EventTarget | null> | EventTarget,
  handler: (e?: Event) => void,
  eventListenerTarget: Ref<EventTarget | null> | EventTarget | null = typeof window !== 'undefined'
    ? window
    : null,
  ignore?: Ref<EventTarget | null>,
) {
  function onClickOutsideHandler(event: Event) {
    const realValue = unref(target) as HTMLElement
    const realIgnore = unref(ignore) as HTMLElement

    const targetEl = event.target as HTMLElement

    if (
      !realValue ||
      targetEl === realValue ||
      targetEl === realIgnore ||
      (realValue && event.composedPath().includes(realValue)) ||
      (realValue && event.composedPath().includes(realIgnore))
    ) {
      return
    }

    handler(event)
  }

  if (eventListenerTarget) {
    useEventListener(eventListenerTarget, 'mouseup', onClickOutsideHandler)
  }
}
