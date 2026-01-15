<template>
  <YInput
    data-compose-ui
    v-bind="props"
    :value="modelValue"
    type="date"
    input-class="y-date-input"
    @change="handleChange"
  >
  </YInput>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { EmitFn, useAttrs } from 'vue'
import './YDateInput.css'
import { YDateInputProps } from './types'

const props = withDefaults(defineProps<YDateInputProps>(), {
  name: 'date-input' + Math.random().toString(36).substring(7),
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change'])

const attrs = useAttrs()

const { modelValue, handleChange } = useInput({ props, attrs, emit })
</script>
