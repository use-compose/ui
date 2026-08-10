<template>
  <YInput
    v-bind="props"
    v-model="modelValue"
    data-compose-ui="block"
    input-class="y-datetime-input"
    type="datetime-local"
    @change="emit('change', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import type { YDateTimeInputProps } from './types'
import './YDateTimeInput.css'

const props = withDefaults(defineProps<YDateTimeInputProps>(), {
  name: 'datetime-input' + Math.random().toString(36).substring(7),
})

const emit = defineEmits<InputEmitsInterface>()
const modelValue = useInput({ props, emit })
</script>
