<template>
  <YFlow :class="getClasses">
    <slot>
      <p>Default content for YStack component</p>
    </slot>
  </YFlow>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YFlow, { YFlowProps } from '../YFlow/YFlow.vue'
import './YStack.css'

export interface YStackProps extends YFlowProps {
  // Define your component props here
}

const getClasses = computed(() => {
  return ['y-stack']
})
</script>
