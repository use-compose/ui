<template>
  <Component :is="level" ref="highlightedText" :class="getClasses">
    <!-- <span> -->
    <span><slot></slot></span>
    <!-- </span> -->
  </Component>
</template>

<script setup lang="ts">
import { useEventListener } from '@/composables/event-listener'
import { computed, ref } from 'vue'
import type { YHighlightedTextProps } from './types'
import './YHighlightedText.scss'

const highlightedText = ref<EventTarget | null>(null)

const props = withDefaults(defineProps<YHighlightedTextProps>(), {
  level: 'h1',
  active: true,
})

// const activeAndAnimate = computed(() => props.animate)

const isHovered = ref(false)

useEventListener(highlightedText, 'mouseenter', () => {
  isHovered.value = true
})
useEventListener(highlightedText, 'mouseleave', () => {
  isHovered.value = false
})

// const { media } = useBreakpoints();

const getClasses = computed(() => [
  'highlighted-text',
  { animate: props.animate },
  { active: props.active },
])
</script>
