<template>
  <label :class="getClasses">
    <slot />
  </label>
</template>

<script setup lang="ts">
import { useRaw } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { computed, defineProps, withDefaults } from 'vue'
import type { YLabelProps } from './types'
import './YLabel.css'

const props = withDefaults(defineProps<YLabelProps>(), {
  ...basePropsDefault,
})

// const { variantClass } = useVariant(props)
// const { stateClass } = useState(props)
// const { colorClass } = useColor(props)
// const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)

const getClasses = computed(() => {
  return [rawClasses.value]
})
</script>
