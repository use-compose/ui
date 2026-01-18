---
to: src/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.vue
---

<template>
  <div :class="getClasses">
    <slot>
      <p>Default content for <%= h.changeCase.pascalCase(name) %> component</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import './<%= h.changeCase.pascalCase(name) %>.css'
import type { ThemeComponentBaseProps } from '@/composables/component-theme'

export interface <%= h.changeCase.pascalCase(name) %>Props extends ThemeComponentBaseProps {
  // Define your component props here
}

const props = withDefaults(defineProps<<%= h.changeCase.pascalCase(name) %>Props>(), {
  // ...basePropsDefault,
})

 // const { variantClass } = useVariant(props)
 // const { stateClass, isDisabled } = useState(props)
 // const { colorClass } = useColor(props)
 // const { sizeClass } = useSize(props)
 // const { rawClasses } = useRaw(props)

 const getClasses = computed(() => {
  return [
    '<%= h.changeCase.kebabCase(name) %>',
//    variantClass.value,
//    stateClass.value,
//    colorClass.value,
//    sizeClass.value,
//    rawClasses.value,
  ]
})
</script>
