<template>
  <YBox v-bind="boxProps" class="y-center" :style="getStyle">
    <slot />
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../../YBox/YBox.vue'
import './YCenter.css'

export interface YCenterProps extends YBoxProps {
  /** Max-width cap on the centered content — the "readable measure". */
  measure?: string
}

const props = withDefaults(defineProps<YCenterProps>(), {
  measure: '34rem',
})

// `measure` is ours, not YBox's — everything else (padding, margin, ...)
// still needs forwarding explicitly, since declaring `measure` here also
// claims the inherited `YBoxProps` and takes them out of `$attrs`.
const boxProps = computed<YBoxProps>(() => {
  const rest: Partial<YCenterProps> = { ...props }
  delete rest.measure
  return rest
})

const getStyle = computed(() => ({ '--y-center-measure': props.measure }))
</script>
