<template>
  <div :class="yContainerClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Component, computed } from 'vue'

interface ContainerProps {
  component?: Component | keyof HTMLElementTagNameMap
  fluid?: boolean
}

const props = withDefaults(defineProps<ContainerProps>(), {
  component: 'div',
})

const yContainerClasses = computed(() => {
  return ['y-container', props.fluid && 'fluid']
})
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';
@import '../../../assets/scss/utils/breakpoints';

.y-container {
  max-width: $breakpoint-mobile;
  padding: var(--space-unit);

  @include media('tablet') {
    max-width: $breakpoint-tablet;
  }

  @include media('desktop') {
    max-width: $breakpoint-desktop;
  }

  @include media('desktop-xl') {
    max-width: $breakpoint-desktop-xl;
  }

  @include media('desktop-xxl') {
    max-width: $breakpoint-desktop-xxl;
  }

  &.fluid {
    width: 100%;
  }
}
</style>
