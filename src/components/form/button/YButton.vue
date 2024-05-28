<template>
  <button :class="getClasses" :disabled="disabled" type="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
// import { useBaseComponent } from '@/composables/use-base-component'
import { useBaseComponent } from '../../../composables/use-base-component'
import { BaseProps } from '@/utils/base-props'
import { computed } from 'vue'

export interface YButtonProps extends BaseProps {
  color?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<YButtonProps>(), {
  color: 'primary',
  size: 'medium',
})

const { baseClasses } = useBaseComponent(props)

const getClasses = computed(() => {
  return [
    ...baseClasses.value,
    'y-button',
    props.color ? `${props.color}-button` : '',
    props.size ? `y-button--${props.size}` : '',
  ]
})

// listen to click event
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
  cursor: pointer;
  text-transform: uppercase;
  padding: var(--space-xs) var(--space-unit);

  @include theme-component;
  --component-padding-y: var(--space-xs);

  // &.y-button--large {
  //   --component-padding-y: var(--space-sm);
  // }
}
</style>
