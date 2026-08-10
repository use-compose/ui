<template>
  <YInput
    v-bind="props"
    v-model="modelValue"
    data-compose-ui="block"
    type="time"
    input-class="y-date-input"
    autocomplete="off"
    @change="emit('change', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import './YTimeInput.css'
import { YTimeInputProps } from './YTimeInput.types'

const props = withDefaults(defineProps<YTimeInputProps>(), {
  name: 'time-input' + Math.random().toString(36).substring(7),
})

const emit = defineEmits<InputEmitsInterface>()
const modelValue = useInput({ props, emit })
</script>
