<template>
  <div :class="getClasses">
    <slot>
      <span>YTag</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { basePropsDefault, useBaseProps } from '@/composables/use-base-props'
import { computed, defineProps, withDefaults } from 'vue'
import type { YTagProps } from './types'
import './YTag.scss'

const props = withDefaults(defineProps<YTagProps>(), {
  ...basePropsDefault,
})

const { baseClasses } = useBaseProps(props)

const getClasses = computed(() => {
  return [...baseClasses.value, 'y-tag']
})
</script>
