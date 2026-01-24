<template>
  <YBox :class="getClasses">
    <slot>
      <p>Default content for YFlow component</p>
    </slot>
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../YBox/YBox.vue'
import './YFlow.css'

export interface YFlowProps extends YBoxProps {
  // Define your component props here
}

// const { variantClass } = useVariant(props)
// const { stateClass, isDisabled } = useState(props)
// const { colorClass } = useColor(props)
// const { sizeClass } = useSize(props)
// const { rawClasses } = useRaw(props)

const getClasses = computed(() => {
  return [
    'y-flow',
    //    variantClass.value,
    //    stateClass.value,
    //    colorClass.value,
    //    sizeClass.value,
    //    rawClasses.value,
  ]
})
</script>
