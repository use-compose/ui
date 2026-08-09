<template>
  <YInput
    v-bind="props"
    v-model="modelValue"
    data-compose-ui="block"
    input-class="y-input-text"
    type="text"
    @input="emit('input', $event)"
    @change="emit('change', $event)"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import './YInputText.css'
import type { YInputTextProps } from './types'

const props = withDefaults(defineProps<YInputTextProps>(), {
  name: 'text-input' + Math.random().toString(36).substring(7),
})

const emit = defineEmits<InputEmitsInterface>()
const modelValue = useInput({ props, emit })
</script>
