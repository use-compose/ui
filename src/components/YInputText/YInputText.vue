<template>
  <YInput
    v-bind="props"
    :value="modelValue"
    @input="$emit('update:modelValue', $event)"
    type="checkbox"
    class="y-input-text"
  >
    <slot />
  </YInput>
</template>

<script setup lang="ts">
import { basePropsDefault } from '@/composables/use-base-props'
import { defineProps, withDefaults } from 'vue'
import { YInput } from '../form'
import type { YInputTextProps } from './types'
import './YInputText.scss'

const props = withDefaults(defineProps<YInputTextProps>(), {
  ...basePropsDefault,
})
</script>
