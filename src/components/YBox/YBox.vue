<template>
  <div :class="getClasses">
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  BackgroundColorKey,
  parseBackgroundColorProps,
  parseBorderProps,
  parseHeightProps,
  parseMarginProps,
  parsePaddingProps,
  parseRadiusProps,
  parseWidthProps,
  type BorderKey,
  type HeightKey,
  type MarginKey,
  type RadiusKey,
  type SpacingKey,
  type WidthKey,
} from '@/components/utils'
import { computed } from 'vue'
import './YBox.css'

export interface YBoxProps {
  padding?: SpacingKey | string
  radius?: RadiusKey | string
  width?: WidthKey
  height?: HeightKey
  margin?: MarginKey | string
  border?: BorderKey | BorderKey[] | string | string[]
  backgroundColor?: BackgroundColorKey | string
}

const props = withDefaults(defineProps<YBoxProps>(), {})

const getClasses = computed(() => {
  return [
    'y-box',
    ...parsePaddingProps(props.padding as SpacingKey),
    ...parseRadiusProps(props.radius as RadiusKey),
    ...parseWidthProps(props.width),
    ...parseHeightProps(props.height),
    ...parseMarginProps(props.margin as MarginKey),
    ...parseBorderProps(props.border as BorderKey),
    ...parseBackgroundColorProps(props.backgroundColor as BackgroundColorKey),
  ]
})
</script>
