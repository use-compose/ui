<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    fill="none"
    :width="width"
    :height="height"
  >
    <rect x="8.2251" y="8.82544" width="270" height="270" stroke="black" stroke-width="16" />
    <rect
      x="31.5024"
      y="244.235"
      width="300"
      height="16"
      transform="rotate(-45 31.5024 244.235)"
      fill="black"
    />
    <rect
      x="42.8159"
      y="32.1025"
      width="300"
      height="16"
      transform="rotate(45 42.8159 32.1025)"
      fill="black"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    stroke: {
      type: String,
      default: 'black',
    },
    fill: {
      type: String,
      default: 'none',
    },
    size: {
      type: Number,
      default: 287,
    },
    width: {
      type: Number,
      default: 24,
    },
    height: {
      type: Number,
      default: 24,
    },
  },
  setup() {
    return {}
  },
  computed: {
    viewBox() {
      return `0 0 ${this.size} ${this.size}`
    },
  },
})
</script>

<style scoped>
svg {
  aspect-ratio: 1;
}
</style>
