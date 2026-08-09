<template>
  <Component :is="props.as" class="y-box" :style="getStyle">
    <slot />
  </Component>
</template>

<script setup lang="ts">
import {
  resolveBackgroundColorValue,
  resolveBorderValue,
  resolveHeightValue,
  resolveRadiusValue,
  resolveSpacingValue,
  resolveWidthValue,
  type BackgroundColorKey,
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
  as?: string
}

// No defaults for the styling props: unset means "don't emit that inline
// style at all", so a plain `<YBox>` doesn't clobber a hand-written utility
// class landing on it via attrs fallthrough (inline style always outranks
// any class, so a default value here would silently win over e.g. a
// `padding-md` class passed in from a parent template). `.y-box` in
// YBox.css supplies the visual defaults (0/auto/transparent/none) via
// `var(--y-box-x, <fallback>)` instead.
const props = withDefaults(defineProps<YBoxProps>(), {
  as: 'div',
})

const getStyle = computed(() => {
  const border = resolveBorderValue(props.border)

  return {
    '--y-box-padding': resolveSpacingValue(props.padding),
    '--y-box-margin': resolveSpacingValue(props.margin),
    '--y-box-radius': resolveRadiusValue(props.radius),
    '--y-box-width': resolveWidthValue(props.width),
    '--y-box-height': resolveHeightValue(props.height),
    '--y-box-border-color': border?.color,
    '--y-box-border-style': border?.style,
    '--y-box-border-width': border?.width,
    borderTopWidth: border?.topWidth,
    borderRightWidth: border?.rightWidth,
    borderBottomWidth: border?.bottomWidth,
    borderLeftWidth: border?.leftWidth,
    '--y-box-bg': resolveBackgroundColorValue(props.backgroundColor),
  }
})
</script>
