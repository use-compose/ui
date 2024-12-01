<template>
  <Transition appear name="fade">
    <div aria-hidden="true" :class="getClasses" @click="handleClick">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

export interface YOverlayProps {
  color?: string
  opacity?: number
  blur?: boolean
}

const props = withDefaults(defineProps<YOverlayProps>(), {
  color: 'var(--color-bg)',
  opacity: 0.5,
  blur: false,
  centerChildren: true,
})

const getClasses = computed(() => {
  return ['y-overlay', { '-blur': props.blur }, { [`-color-${props.color}`]: props.color }]
})

const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  console.log('📟 - file: YOverlay.vue:47 - handleClick → ', handleClick)

  emit('click', e)
}
</script>

<style lang="scss">
@import '@/assets/scss/utils';

.y-overlay {
  position: fixed;
  inset: 0;
  background-color: color(dark-50);
  transition: opacity 0.3s ease;
  z-index: 999;
}
</style>
