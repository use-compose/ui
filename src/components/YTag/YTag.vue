<template>
  <div :class="getClasses">
    <slot>
      <span>YTag</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { basePropsDefault, useComponentTheme } from '@/composables/component-theme'
import { computed, defineProps, withDefaults } from 'vue'
import type { YTagProps } from './types'
import './YTag.scss'

const props = withDefaults(defineProps<YTagProps>(), {
  ...basePropsDefault,
})

const { baseClasses } = useComponentTheme(props)

const getClasses = computed(() => {
  return [...baseClasses.value, 'y-tag']
})
</script>
