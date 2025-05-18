<template>
  <div :class="yCardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useBaseProps } from '@/composables/use-base-props'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import './YCard.scss'

export interface YCardProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YCardProps>(), {})

const { baseClasses } = useBaseProps(props)

const yCardClasses = computed(() => {
  return [[...baseClasses.value], 'y-card']
})
</script>
