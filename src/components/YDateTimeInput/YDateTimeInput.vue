<template>
  <YInput
    data-compose-ui
    v-bind="props"
    :value="modelValue"
    input-class="y-datetime-input"
    type="datetime-local"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { EmitFn, useAttrs } from 'vue'
import type { YDateTimeInputProps } from './types'
import './YDateTimeInput.css'

const props = withDefaults(defineProps<YDateTimeInputProps>(), {
  name: 'datetime-input' + Math.random().toString(36).substring(7),
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change'])

const attrs = useAttrs()

const { modelValue, handleChange } = useInput({ props, attrs, emit })
</script>
