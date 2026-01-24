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
<style>
:root {
  --skeleton-base: #c0c0c0;
  --skeleton-highlight: #fd0;
  --border-color: #000;
  --animation-duration: 1.2s;
  --highlight-width: 30%; /* how wide the moving bar is */
}

.brutalist-skeleton {
  background-color: var(--skeleton-base);
  border: 2px solid var(--border-color);
  overflow: hidden;
  position: relative;

  /* no border-radius for that brutalist feel */
}

.brutalist-skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: -var(--highlight-width);
  width: var(--highlight-width);
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--skeleton-highlight) 50%,
    transparent 100%
  );
  background-color: var(--skeleton-highlight);
  animation: brutal-shimmer-solid var(--animation-duration) infinite;
}

/* horizontal line placeholders */
.brutalist-skeleton-line {
  display: block;
  width: 100%;
  height: 16px;
  margin: 12px 0;
}

/* square/circle variants */
.brutalist-skeleton-block {
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
}

.brutalist-skeleton-circle {
  width: 48px;
  height: 48px;
  border-radius: 0; /* keep square if you want full brutalism */

  /* if you prefer a circular headshot placeholder, set to 50% */

  /* border-radius: 50%; */
}

/* shimmer keyframes */
@keyframes brutal-shimmer-solid {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(200%);
  }
}
</style>
