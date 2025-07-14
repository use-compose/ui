<template>
  <div :class="yCardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { ThemeComponentBaseProps } from '@/composables/component-theme'
import { computed } from 'vue'
import './YCard.scss'

export interface YCardProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YCardProps>(), {})

const { variantClass } = useVariant(props)
const { stateClass } = useState(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)

const yCardClasses = computed(() => {
  return [
    variantClass.value,
    stateClass.value,
    colorClass.value,
    sizeClass.value,
    rawClasses.value,
    'y-card',
  ]
})
</script>
