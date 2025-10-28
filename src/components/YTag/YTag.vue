<template>
  <div data-compose-ui :class="getClasses">
    <slot>
      <span>YTag</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { computed, defineProps, withDefaults } from 'vue'
import './YTag.scss'
import type { YTagProps } from './YTag.types'

const props = withDefaults(defineProps<YTagProps>(), {
  ...basePropsDefault,
})

const { variantClass } = useVariant(props)
const { stateClass } = useState(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)

const getClasses = computed(() => {
  return [
    variantClass.value,
    stateClass.value,
    colorClass.value,
    sizeClass.value,
    rawClasses.value,
    'y-tag',
  ]
})
</script>
