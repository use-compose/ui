<template>
  <label :class="getClasses">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { basePropsDefault, useComponentTheme } from '@/composables/component-theme'
import { computed, defineProps, withDefaults } from 'vue'
import type { YLabelProps } from './types'
import './YLabel.scss'

const props = withDefaults(defineProps<YLabelProps>(), {
  ...basePropsDefault,
})

const { baseClasses } = useComponentTheme(props)

const getClasses = computed(() => {
  return [[...baseClasses.value]]
})
</script>
