<template>
  <YFlow>
    <slot name="title" />
    <slot name="description" />
  </YFlow>
</template>

<script setup lang="ts">
// import { defineProps, withDefaults } from 'vue'
import YFlow from '../YFlow/YFlow.vue'
import './ComponentDocs.css'

// const props = withDefaults(defineProps<ComponentDocsProps>(), {
//   // ...basePropsDefault,
// })

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
