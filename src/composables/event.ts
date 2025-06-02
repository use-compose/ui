import { SetupContext, defineEmits } from 'vue'

export function useDynamicEmits(attrs: SetupContext['attrs']): {
  eventsToEmit: string[] | undefined
  triggerEvent: (eventName: string, ...args: any[]) => void
} {
  if (!attrs) {
    return
  }

  const events = attrs
  console.log('📟 - events → ', events)

  function getEventsToEmit() {
    const eventsToEmit: string[] = []
    Object.keys(events).forEach((event: string) => {
      if (event.startsWith('on')) {
        // Check if the event is a custom event
        const isCustomEvent = event.replace(/^on/, '').toLowerCase()
        if (isCustomEvent === 'click') {
          return
        }
        eventsToEmit.push(isCustomEvent)
      }
    })
    return eventsToEmit
  }
  const eventsToEmit: string[] = getEventsToEmit()
  console.log('eventsToEmit', eventsToEmit)

  eventsToEmit.forEach((event: string) => {
    // triggerEvent(event)
  })
  function triggerEvent(eventName: string, ...args: any[]) {
    const emit = defineEmits()

    console.log('📟 - eventName → ', eventName)
    if (eventsToEmit.includes(eventName)) {
      console.log('📟 - eventName → ', eventName)
      emit(eventName, ...args)
    }
  }

  return {
    eventsToEmit,
    triggerEvent,
  }
}
