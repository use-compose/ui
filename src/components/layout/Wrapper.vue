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
  return ['wrapper', 'test', 'padding-xl', 'margin-xl']
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
<style lang="scss">
.wrapper {
  background-color: var(--color-primary);
  min-height: 100vh;
}
</style>
