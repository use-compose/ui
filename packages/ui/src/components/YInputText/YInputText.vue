<template>
  <YInput
    data-compose-ui="block"
    v-bind="props"
    input-class="y-input-text"
    type="text"
    :model-value="modelValue"
    @change="updateModelValue"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import { useAttrs } from 'vue'
import type { YInputTextProps } from './types'

const props = withDefaults(defineProps<YInputTextProps>(), {
  name: 'text-input' + Math.random().toString(36).substring(7),
})

const emit = defineEmits<InputEmitsInterface>()

const attrs = useAttrs()
const { modelValue, updateModelValue } = useInput({ props, emit, attrs })
</script>
