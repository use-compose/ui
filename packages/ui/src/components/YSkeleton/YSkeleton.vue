<template>
  <div :class="getClasses">
    <slot>
      <div class="brutalist-skeleton brutalist-skeleton-line"></div>
      <div class="brutalist-skeleton brutalist-skeleton-block"></div>
      <div class="brutalist-skeleton brutalist-skeleton-circle"></div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import './YSkeleton.css'

const getClasses = computed(() => {
  return ['skeleton-container']
})
</script>
