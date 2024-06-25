<template>
  <div :class="yCardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseProps } from '@/utils/base-props'
import { useBaseComponent } from '../../../composables/use-base-component'

export interface CardProps extends BaseProps {}

const props = withDefaults(defineProps<CardProps>(), {})

const { baseClasses } = useBaseComponent(props)

const yCardClasses = computed(() => {
  return [...baseClasses.value, 'y-card']
})
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';
@import '../../../assets/scss/utils/breakpoints';

.y-card {
  @include theme-component;

  --component-bg-opacity: 0.5;

  padding: var(--space-sm);
  border-radius: var(--border-radius);
  word-wrap: break-word;

  &:active,
  &:focus-visible {
    transform: unset;

    --component-box-shadow: var(--box-shadow-hover);
  }

  &.outlined {
    border: 1px solid var(--primary);
  }

  // @include media('tablet') {
  //   max-width: $breakpoint-tablet;
  // }

  // @include media('desktop') {
  //   max-width: $breakpoint-desktop;
  // }

  // @include media('desktop-xl') {
  //   max-width: $breakpoint-desktop-xl;
  // }

  // @include media('desktop-xxl') {
  //   max-width: $breakpoint-desktop-xxl;
  // }
}
</style>
