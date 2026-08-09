<template>
  <YBox v-bind="boxProps" class="y-screen" :style="getStyle">
    <slot />
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../../YBox/YBox.vue'
import './YScreen.css'

export interface YScreenProps extends YBoxProps {
  /** Min-height of the screen. Defaults to `100svh` (fills the viewport —
   * Every Layout's "Banner"). Pass e.g. `100%` for the plain "Cover"
   * behavior of filling its parent instead. */
  minHeight?: string
}

const props = withDefaults(defineProps<YScreenProps>(), {
  minHeight: '100svh',
})

// `minHeight` is ours, not YBox's — see YCenter.vue for why the rest still
// needs forwarding explicitly.
const boxProps = computed<YBoxProps>(() => {
  const rest: Partial<YScreenProps> = { ...props }
  delete rest.minHeight
  return rest
})

const getStyle = computed(() => ({ '--y-screen-min-height': props.minHeight }))
</script>
