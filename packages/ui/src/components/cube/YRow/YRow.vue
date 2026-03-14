<template>
  <YBox :class="getClasses">
    <slot>
      <p>Default content for YRow component</p>
    </slot>
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../../YBox/YBox.vue'

export interface YRowProps extends YBoxProps {
  type: 'cluster' | 'switcher' | 'default'
}

const props = withDefaults(defineProps<YRowProps>(), {
  // ...basePropsDefault,
})

const getClasses = computed(() => {
  return [
    `${props.type}`,
    //    variantClass.value,
    //    stateClass.value,
    //    colorClass.value,
    //    sizeClass.value,
    //    rawClasses.value,
  ]
})
</script>
