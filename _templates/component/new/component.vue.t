---
to: src/components/<%= name %>/<%= name %>.vue
---

<template>
  <div :class="getClasses">
    <slot>
      <p>Default content for <%= name %> component</p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { basePropsDefault, useBaseProps } from '@/composables/use-base-props'
import { computed, defineProps, withDefaults } from 'vue'
import type { <%= name %>Props } from './types'
import './<%= name %>.scss'

const props = withDefaults(defineProps<<%= name %>Props>(), {
  ...basePropsDefault,
})

const { baseClasses } = useBaseProps(props)

const getClasses = computed(() => {
  return [[...baseClasses.value]]
})
</script>
