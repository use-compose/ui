<template>
  <YInput
    v-bind="props"
    v-model="modelValue"
    data-compose-ui="block"
    type="date"
    input-class="y-date-input"
    @change="emit('change', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import './YDateInput.css'
import { YDateInputProps } from './types'

const props = withDefaults(defineProps<YDateInputProps>(), {
  name: 'date-input' + Math.random().toString(36).substring(7),
})

const emit = defineEmits<InputEmitsInterface>()
const modelValue = useInput({ props, emit })
</script>
