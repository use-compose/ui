<template>
  <Component :is="level" ref="highlightedTextRef" :class="getClasses">
    <!-- <span> -->
    <!-- <span class="switch-color"><slot></slot></span> -->
    <span><slot></slot></span>
    <!-- </span> -->
  </Component>
</template>

<script setup lang="ts">
import { useAnimation } from '@/composables'
import { useEventListener } from '@/composables/event-listener'
import { computed, useTemplateRef } from 'vue'
import type { YHighlightedTextProps } from './types'
import './YHighlightedText.scss'

const props = withDefaults(defineProps<YHighlightedTextProps>(), {
  level: 'h1',
  active: true,

  // Stick the highlighted text to the left side of the container on mobile viewports
  // 💡 Will only works if used inside a "Wrapper" element
  stickToLeft: false,
})

// const activeAndAnimate = computed(() => props.animate)
const highlightedTextRef = useTemplateRef<HTMLElement>('highlightedTextRef')

const { isHoveredOnce } = useAnimation(highlightedTextRef)

useEventListener(highlightedTextRef, 'mouseenter', () => {
  if (!isHoveredOnce.value) {
    isHoveredOnce.value = true
  }
})

const getClasses = computed(() => [
  'highlighted-text',
  props.active ? 'active' : '',
  props.animate ? 'animate' : '',
  props.stickToLeft ? 'stick-to-left' : '',
])
</script>
