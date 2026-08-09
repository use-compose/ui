<template>
  <YBox v-bind="boxProps" :class="getClasses">
    <slot>
      <p>Default content for YRow component</p>
    </slot>
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../../YBox/YBox.vue'
import './YRow.css'

export interface YRowProps extends YBoxProps {
  type: 'cluster' | 'switcher' | 'default'
}

const props = withDefaults(defineProps<YRowProps>(), {
  // ...basePropsDefault,
})

// `type` is consumed here (it drives the class list below) — everything else
// inherited from `YBoxProps` still needs forwarding explicitly, since
// declaring it via `defineProps` takes it out of `$attrs`. See YCenter.vue
// for the same pattern.
const boxProps = computed<YBoxProps>(() => {
  const rest: Partial<YRowProps> = { ...props }
  delete rest.type
  return rest
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
