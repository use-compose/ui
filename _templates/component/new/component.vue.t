---
to: src/components/<%= name %>/<%= name %>.vue
---

<template>
  <div :class="getClasses">
    <slot>
      <p>Default content for <%= name %> component</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { basePropsDefault, useComponentTheme } from '@/composables/use-base-props'
import { computed, defineProps, withDefaults } from 'vue'
import type { <%= name %>Props } from './types'
import './<%= name %>.scss'

const props = withDefaults(defineProps<<%= name %>Props>(), {
  // ...basePropsDefault,
})

 // const { variantClass } = useVariant(props)
 // const { stateClass, isDisabled } = useState(props)
 // const { colorClass } = useColor(props)
 // const { sizeClass } = useSize(props)
 // const { rawClasses } = useRaw(props)

// const getClasses = computed(() => {
//  return [variantClass.value,
//    stateClass.value,
//    colorClass.value,
//    sizeClass.value,
//    rawClasses.value,
//  ]
//})
</script>
