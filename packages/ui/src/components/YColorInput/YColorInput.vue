<template>
  <YInput
    :model-value="inputValue"
    type="color"
    input-class="y-color-input"
    :name="name"
    autocomplete="off"
    :label="label"
    @change="onChange"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { EmitFn, ref } from 'vue'
import './YColorInput.css'
import { YColorInputProps } from './types'

const props = withDefaults(defineProps<YColorInputProps>(), {
  name: 'color-input' + Math.random().toString(36).substring(7),
  variant: 'contained',
})

const emit: EmitFn = defineEmits(['update:modelValue', 'change'])

const inputValue = ref(props.modelValue || '#000000')

// Deliberately not `v-model`/`@input`: a colour picker's native `input`
// event fires continuously while dragging inside the picker UI, and we only
// want to commit (and trigger whatever the model write does downstream —
// here, a localStorage write) once the user has actually picked a colour.
function onChange(value: string | number | boolean) {
  inputValue.value = value as string
  emit('change', inputValue.value)
  emit('update:modelValue', inputValue.value)
}
</script>
