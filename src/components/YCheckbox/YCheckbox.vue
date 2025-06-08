<template>
  <YInput
    v-bind="props"
    ref="yCheckboxRef"
    :value="modelValue"
    type="checkbox"
    input-class="y-checkbox"
    class="y-checkbox-wrapper"
    :name="name"
    autocomplete="off"
    @blur="handleEvent"
    @change="handleCheckedChange"
  />
</template>

<script setup lang="ts">
import { YInput } from '@/components/YInput'
import { useAnimation } from '@/composables/animation'
import { useInput } from '@/composables/input'
import { basePropsDefault } from '@/composables/use-base-props'
import { EmitFn, onMounted, useAttrs, useTemplateRef } from 'vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.scss'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  ...basePropsDefault,
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
const { handleEvent, handleChange, modelValue, handleFocus } = useInput({
  props,
  attrs,
  emit,
})
// eslint-disable-next-line no-console
console.log('📟 - handleFocus → ', handleFocus)

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
