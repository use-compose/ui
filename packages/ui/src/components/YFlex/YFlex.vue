<template>
  <YBox :class="flexClasses" :style="flexStyle">
    <slot></slot>
  </YBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { parseGapProps, SpacingKey } from '../utils'
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
  gap?: SpacingKey | string
}

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  justify: 'normal',
  align: 'center',
  gap: 'sm',
})

const flexClasses = computed(() => {
  return ['y-flex', ...parseGapProps(props.gap as SpacingKey)]
})

const flexStyle = computed(() => {
  return {
    '--direction': props.direction,
    '--justify-content': props.justify,
    '--align-items': props.align,
    '--layout-gap': props.gap,
  }
})
</script>
