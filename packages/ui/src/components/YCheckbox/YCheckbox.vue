<template>
  <YInput
    v-bind="props"
    ref="checkboxRef"
    v-model="modelValue"
    type="checkbox"
    input-class="y-checkbox"
    class="y-checkbox-wrapper"
    @change="handleCheckedChange"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useAnimation } from '@/composables/animation'
import { useInput, type InputEmitsInterface } from '@/composables/input'
import { useTemplateRef } from 'vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.css'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const checkboxRef = useTemplateRef<{ inputRef: HTMLElement | null }>('checkboxRef')

const { hasChangedOnce } = useAnimation(() => checkboxRef.value?.inputRef ?? null)

defineOptions({
  name: 'YCheckbox',
})

const emit = defineEmits<InputEmitsInterface>()
const modelValue = useInput({ props, emit })

function handleCheckedChange(value: boolean) {
  if (!hasChangedOnce.value) {
    hasChangedOnce.value = true
  }
  emit('change', value)
}
</script>
