<template>
  <YBox :class="flexClasses" :style="flexStyle">
    <slot></slot>
  </YBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import YBox from '../YBox/YBox.vue'
import './YFlex.css'

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
  gap: 'var(--_spacing-sm)',
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
