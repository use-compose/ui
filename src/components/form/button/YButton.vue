<template>
  <button class="y-button" :class="getClasses" :disabled="disabled" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: string
    disabled?: boolean
    size?: 'small' | 'medium' | 'large'
  }>(),
  {
    color: 'primary',
    size: 'medium',
  },
)

const getClasses = computed(() => {
  return [
    props.color ? `${props.color}-button` : '',
    props.size ? props.size : '',
    props.disabled ? 'disabled' : '',
  ]
})

const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
  } else {
    emit('click', e)
  }
}
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';

.y-button {
  position: relative;
  border: none;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
  padding: var(--space-xxs) var(--space-xs);

  @include theme-component;

  &.large {
    padding: 12px 16px;
    padding: var(--space-xs) var(--space-unit);
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
