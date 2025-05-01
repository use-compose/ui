<template>
  <button :class="getClasses" :disabled="isDisabled" type="button" @click="handleClick">
    <slot>YButton</slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { basePropsDefault, useBaseProps } from '@/composables/use-base-props'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed, defineProps, withDefaults } from 'vue'
import './YDivider.scss'

export interface YDividerProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YDividerProps>(), {
  ...basePropsDefault,
})

const { baseClasses, isDisabled } = useBaseProps(props)

const getClasses = computed(() => {
  return [[...baseClasses.value], 'y-button']
})

// listen to click event
const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
  } else {
    emit('click', e)
  }
}
</script>
