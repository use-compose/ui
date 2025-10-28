<template>
  <YInput
    data-compose-ui
    v-bind="props"
    ref="yCheckboxRef"
    :value="modelValue"
    type="checkbox"
    input-class="y-checkbox"
    class="y-checkbox-wrapper"
    @change="handleCheckedChange"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useAnimation } from '@/composables/animation'
import { useInput } from '@/composables/input'
import { EmitFn, onMounted, useAttrs, useTemplateRef } from 'vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.scss'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const yCheckboxRef = useTemplateRef<HTMLInputElement>('yCheckboxRef')

const { hasChangedOnce } = useAnimation(yCheckboxRef)

defineOptions({
  name: 'YCheckbox',
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change', 'input'])
const attrs = useAttrs()
const { handleChange, modelValue } = useInput({
  props,
  attrs,
  emit,
})

// const handleFocus = () => yInput.value?.focus()
const handleCheckedChange = (event: Event) => {
  if (!hasChangedOnce.value) {
    hasChangedOnce.value = true
  }
  const isHandleChange = handleChange && typeof handleChange === 'function'

  if (isHandleChange) {
    handleChange(event)
  }
}
onMounted(() => {
  if (props.focus && yCheckboxRef.value) {
    // If focus prop is true, focus the input element
    // handleFocus(yCheckboxRef.value as HTMLInputElement)
  }
})
</script>
