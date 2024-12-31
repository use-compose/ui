<template>
  <div :class="yCardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useBaseProps } from '@/composables/use-base-props'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'

export interface YCardProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YCardProps>(), {})

const { baseClasses } = useBaseProps(props)

const yCardClasses = computed(() => {
  return [[...baseClasses.value], 'y-card']
})
</script>

<style lang="scss">
@import '@/assets/scss/utils';

.y-card {
  @include theme-component;

  @include component(bg-opacity, 0.5);
  // @include component(bg, hsla(from color(primary) h s l / component(bg-opacity)));

  padding: space(sm);
  border-radius: var(--border-radius);
  word-wrap: break-word;

  &:active,
  &:focus-visible {
    transform: unset;

    @include component(box-shadow, component(box-shadow-hover));
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
