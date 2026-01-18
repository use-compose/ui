<template>
  <button data-compose-ui :class="getClasses" :disabled="isDisabled" @click="handleClick">
    <slot>YButton</slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
import { computed } from 'vue'
import { YButtonProps } from './types'
import './YButton.css'

const props = withDefaults(defineProps<YButtonProps>(), {
  ...basePropsDefault,
})

// const { variantClass } = useVariant(props)
const { isDisabled } = useState(props)

const getClasses = computed(() => {
  // const { variantClass } = useVariant(props)
  const { variantClass } = useVariant(props)
  const { stateClass } = useState(props)
  const { colorClass } = useColor(props)
  const { sizeClass } = useSize(props)
  const { rawClasses } = useRaw(props)
  return [
    rawClasses.value,
    'y-button',
    variantClass.value,
    stateClass.value,
    colorClass.value,
    sizeClass.value,
  ]
})

// listen to click event
const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  if (props.state === 'disabled') {
    e.preventDefault()
  } else {
    emit('click', e)
  }
}
</script>
