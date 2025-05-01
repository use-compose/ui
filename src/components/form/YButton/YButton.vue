<template>
  <button :class="getClasses" :disabled="isDisabled" type="button" :style="semanticTokens" @click="handleClick">
    <slot>YButton</slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { basePropsDefault, useBaseProps } from '@/composables/use-base-props'
import { computed, defineProps, withDefaults } from 'vue'
import { YButtonProps } from './types'
import './YButton.scss'

const props = withDefaults(defineProps<YButtonProps>(), {
  ...basePropsDefault,
})

const { baseClasses, isDisabled, semanticTokens } = useBaseProps(props)

const getClasses = computed(() => {
  return [[...baseClasses.value], 'y-button']
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

<style lang="scss">
@import '@/assets/scss/utils';
</style>
