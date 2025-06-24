<template>
  <div :class="yCardClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useComponentTheme } from '@/composables/component-theme'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed } from 'vue'
import './YCard.scss'

export interface YCardProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YCardProps>(), {})

const { baseClasses } = useComponentTheme(props)

const yCardClasses = computed(() => {
  return [...baseClasses.value, 'y-card']
})
</script>
