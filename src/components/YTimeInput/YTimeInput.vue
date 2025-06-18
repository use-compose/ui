<template>
  <YInput
    v-bind="props"
    :value="modelValue"
    type="time"
    input-class="y-date-input"
    :name="name"
    autocomplete="off"
    :label="label"
    @change="handleChange"
  >
  </YInput>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { EmitFn, useAttrs } from 'vue'
import './YTimeInput.scss'
import { YTimeInputProps } from './types'

const props = withDefaults(defineProps<YTimeInputProps>(), {
  name: 'time-input' + Math.random().toString(36).substring(7),
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change'])
const attrs = useAttrs()

const { modelValue, handleChange } = useInput({ props, attrs, emit })
</script>
