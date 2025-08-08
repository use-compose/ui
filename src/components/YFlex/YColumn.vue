<template>
  <div :class="getClasses">
    <slot>
      <p>Default content for YColumn component</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'
import type { YColumnProps } from '../YColumn/types'
import './YColumn.scss'

const props = withDefaults(defineProps<YColumnProps>(), {
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
