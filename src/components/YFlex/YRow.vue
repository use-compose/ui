<template>
  <YFlex :class="getClasses">
    <slot>
      <p>Default content for YRow component</p>
    </slot>
  </YFl>
</template>

<script setup lang="ts">
import { basePropsDefault, useComponentTheme } from '@/composables/use-base-props'
import { computed, defineProps, withDefaults } from 'vue'
import type { YRowProps } from './types'
import './YRow.scss'
import YFlex from './YFlex.vue';

const props = withDefaults(defineProps<YRowProps>(), {
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
