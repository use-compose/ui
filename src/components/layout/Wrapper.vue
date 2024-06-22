<template>
  <div :class="wrapperClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// interface WrapperProps {
//   maxWidth?: string | number
// }

// const props = defineProps<WrapperProps>()

const wrapperClasses = computed(() => {
  return ['wrapper']
})

// const wrapperMaxWidth = computed(() => {
//   return props.maxWidth ? `${props.maxWidth}px` : '100%'
// })
</script>
<!-- <style lang="scss">
.wrapper {
  margin-right: auto;
  margin-left: auto;
  max-width: v-bind(wrapperMaxWidth);
  padding-right: var(--space-md);
  padding-left: var(--space-md);
}
</style> -->
<style scoped lang="scss">
// https://css-tricks.com/use-css-clamp-to-create-a-more-flexible-wrapper-utility/
.wrapper {
  width: clamp(16rem, 90vw, 70rem);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-unit);
  padding-right: var(--space-unit);
}
</style>
