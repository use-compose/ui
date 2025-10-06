<template>
  <div :class="wrapperClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import './Wrapper.scss'

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
