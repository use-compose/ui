// Utilities

// Types
import { computed, type StyleValue } from 'vue'

export type ClassValue = string | string[] | Record<string, boolean> | undefined

export interface ComponentAtributes {
  class?: ClassValue
  style?: StyleValue | undefined
}

// Composables
export function useComponentProps(attrs: ComponentAtributes) {
  const { class: className, style } = attrs

  const componentProps = computed(() => {
    return [className, style]
  })

  return componentProps
}
