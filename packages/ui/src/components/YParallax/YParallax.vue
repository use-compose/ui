<template>
  <div :class="getClasses">
    <slot>
      <p>Default content for YParallax component</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import type { ThemeComponentBaseProps } from '@/composables/component-theme'
import { computed } from 'vue'
import './YParallax.css'

export interface YParallaxProps extends ThemeComponentBaseProps {
  // Define your component props here
}

// const props = withDefaults(defineProps<YParallaxProps>(), {
//   // ...basePropsDefault,
// })

// const { variantClass } = useVariant(props)
// const { stateClass, isDisabled } = useState(props)
// const { colorClass } = useColor(props)
// const { sizeClass } = useSize(props)
// const { rawClasses } = useRaw(props)

const getClasses = computed(() => {
  return [
    'y-parallax',
    //    variantClass.value,
    //    stateClass.value,
    //    colorClass.value,
    //    sizeClass.value,
    //    rawClasses.value,
  ]
})
</script>
