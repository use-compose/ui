<template>
  <YBox as="section" :class="getClasses">
    <slot>
      <p>Default content for YRegion component</p>
    </slot>
  </YBox>
</template>

<script setup lang="ts">
import { YBoxProps } from '@/components/YBox/YBox.vue'
import { computed } from 'vue'
import './YRegion.css'

export interface YRegionProps extends YBoxProps {
  // Define your component props here
}

const getClasses = computed(() => {
  return ['y-region']
})
</script>
