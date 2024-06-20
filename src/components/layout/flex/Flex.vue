<template>
  <div :class="flexClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface FlexProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse' | 'initial' | 'inherit'
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-around'
    | 'space-between'
    | 'space-evenly'
    | 'stretch'
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch'
}

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  align: 'center',
})

const flexClasses = computed(() => {
  return [
    'yFlex',
    `flex-${props.direction}`,
    props.justify ? `justify-${props.justify}` : '',
    `align-${props.align}`,
  ]
})
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';
@import '../../../assets/scss/utils/breakpoints';

.yFlex {
  width: 100%;
  display: flex;
  // justify-content: space-between;
  gap: var(--space-unit);
  padding: var(--space-unit) 0;

  @include media('desktop') {
    max-width: 900px;
    margin: auto;
  }
}
</style>
