<template>
  <div :class="flexClasses" :style="flexStyle">
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
    | 'normal'
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'normal'
}

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  justify: 'normal',
  align: 'normal',
})

const flexClasses = computed(() => {
  return ['yFlex']
})

const flexStyle = computed(() => {
  return {
    '--direction': props.direction,
    '--justifyContent': props.justify,
    '--alignItems': props.align,
  }
})

// const justifyContent = computed(() => {
//   return props.justify;
// })

// const alignItems = computed(() => {
//   return props.align
// })

// const direction = computed(() => {
//   return props.direction
// })
</script>

<style lang="scss">
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
// @use '@/assets/scss/utils/mixins' as *;
// @use '@/assets/scss/base/base' as *;
// @use '@/assets/scss/utils/breakpoints.scss' as *;
// @use '@/assets/scss/base/spacing' as *;

.yFlex {
  // @include cssvars(
  //   '',
  //   (
  //     flex-gap: space(xs),
  //     direction: row,
  //     alignItems: flex-start,
  //     justifyContent: flex-start,
  //   )
  // );
  // --flex-gap: space(xs);
  // --direction: v-bind(direction);
  // --alignItems: v-bind(alignItems);
  // --justifyContent: v-bind(justifyContent);

  display: flex;
  flex-flow: var(--direction) wrap;
  align-items: var(--alignItems);
  justify-content: var(--justifyContent);
  gap: var(--flex-gap);
  padding: space(sm) 0;
}
</style>
