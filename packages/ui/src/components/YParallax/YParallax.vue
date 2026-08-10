<template>
  <div class="y-parallax" :style="{ height }">
    <div class="parallax-back">
      <slot name="back" />
    </div>
    <div class="parallax-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import './YParallax.css'

export interface YParallaxProps {
  /** Height of the scrolling viewport — the parallax effect needs a bounded, scrollable container. */
  height?: string
}

withDefaults(defineProps<YParallaxProps>(), {
  height: '100vh',
})
</script>
