<template>
  <Transition name="fade">
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
  /** Position in the stack of currently-open overlays (0 = first). CSS turns
   * this into an actual z-index — see `.y-overlay` in YModal.css. */
  stackIndex?: number
}

const props = withDefaults(defineProps<YOverlayProps>(), {
  color: 'var(--overlay-bg)',
  opacity: 0.2,
  blur: '8px',
  centerChildren: true,
  stackIndex: 0,
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
    '--stack-index': props.stackIndex,
  }
})

const emit = defineEmits(['click'])

function handleClick(e: Event) {
  emit('click', e)
}
</script>
