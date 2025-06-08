<template>
  <Transition appear name="fade">
    <div v-show="modelValue" :class="getClasses" :style="getStyles" @click="handleClick">
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'

export interface YOverlayProps {
  modelValue: boolean
  color?: string
  opacity?: number
  blur?: number | string
  zIndex?: number
}

const props = withDefaults(defineProps<YOverlayProps>(), {
  color: 'var(--overlay-bg)',
  opacity: 0.2,
  blur: '8px',
  centerChildren: true,
  zIndex: 1000,
})

const getClasses = computed(() => {
  return [
    'y-overlay',
    { '-blur': props.blur },
    props.color && { [`-color-${props.color}`]: props.color },
  ]
})

const getStyles = computed(() => {
  return {
    ...(props.color && { '--overlay-bg': props.color ? props.color : 'var(--color-bg)' }),
    '--overlay-opacity': props.opacity,
    '--overlay-blur': props.blur,
    '--dialog-z-index': props.zIndex,
  }
})

const emit = defineEmits(['click'])

function handleClick(e: Event) {
  emit('click', e)
}
</script>
