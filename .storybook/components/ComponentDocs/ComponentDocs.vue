<template>
  <YFlow
    background-color="info"
    padding="lg"
    border-radius="md"
    border="solid neutral width-medium"
  >
    <slot name="title">
      <h4>Component Documentation</h4>
    </slot>
    <slot name="description">
      <p>This is the component documentation section.</p>
    </slot>

    <slot />
  </YFlow>
</template>

<script setup lang="ts">
import YFlow from '@/components/YFlow/YFlow.vue'
</script>
