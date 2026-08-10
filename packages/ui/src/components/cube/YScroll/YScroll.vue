<template>
  <YBox v-bind="boxProps" class="y-scroll" :style="getStyle">
    <slot />
  </YBox>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YBox, { YBoxProps } from '../../YBox/YBox.vue'
import './YScroll.css'

export interface YScrollProps extends YBoxProps {
  /** Height of the scroll track. Defaults to a clamp that grows with the
   * viewport. Bound inline rather than left to the stylesheet: YBox's own
   * `height` utility classes live in the `utilities` CSS layer, which always
   * outranks `components` regardless of selector specificity, so a
   * stylesheet-based default here would silently lose to `.height-auto`. */
  blockSize?: string
}

const props = withDefaults(defineProps<YScrollProps>(), {
  blockSize: 'clamp(220px, 115px + 32vw, 520px)',
})

// `blockSize` is ours, not YBox's — everything else (padding, margin, ...)
// still needs forwarding explicitly, since declaring it here also claims the
// inherited `YBoxProps` and takes them out of `$attrs`.
const boxProps = computed<YBoxProps>(() => {
  const rest: Partial<YScrollProps> = { ...props }
  delete rest.blockSize
  return rest
})

const getStyle = computed(() => ({ blockSize: props.blockSize }))
</script>
