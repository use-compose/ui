<template>
  <div :class="flexClasses" :style="flexStyle">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import './YFlex.scss'

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
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch' | 'normal'
  gap?: string
}

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  justify: 'normal',
  align: 'center',
  gap: 'var(--space-sm)',
})

const flexClasses = computed(() => {
  return ['y-flex']
})

const flexStyle = computed(() => {
  return {
    '--direction': props.direction,
    '--justifyContent': props.justify,
    '--alignItems': props.align,
    '--layout-gap': props.gap,
  }
})
</script>
