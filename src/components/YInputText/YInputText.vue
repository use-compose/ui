<template>
  <YInput
    v-bind="props"
    input-class="y-input-text"
    type="text"
    :value="modelValue"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { defineEmits, useAttrs, type EmitFn } from 'vue'
import type { YInputTextProps } from './types'

const props = withDefaults(defineProps<YInputTextProps>(), {
  name: 'text-input' + Math.random().toString(36).substring(7),
})

const emit: EmitFn = defineEmits(['update:modelValue', 'input', 'change', 'blur'])

const attrs = useAttrs()
const { modelValue, handleInput } = useInput({ props, attrs, emit })
</script>
