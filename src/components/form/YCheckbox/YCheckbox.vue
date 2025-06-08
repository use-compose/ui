<template>
  <YInput
    v-bind="props"
    input-ref="yCheckboxRef"
    :value="modelValue"
    type="checkbox"
    input-class="y-checkbox"
    :name="name"
    autocomplete="off"
    @input="handleEvent"
    @blur="handleEvent"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { useClickEvent } from '@/composables/animation'
import { useInput } from '@/composables/input'
import { basePropsDefault } from '@/composables/use-base-props'
import { EmitFn, onMounted, useAttrs, useTemplateRef } from 'vue'
import YInput from '../YInput/YInput.vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.scss'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  ...basePropsDefault,
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const yCheckboxRef = useTemplateRef<EventTarget | null>('yCheckboxRef')

const { isClickedOnce } = useClickEvent(yCheckboxRef)
// eslint-disable-next-line no-console
console.log('📟 - isClickedOnce → ', isClickedOnce)

defineOptions({
  name: 'YCheckbox',
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change', 'input'])
const attrs = useAttrs()
const { handleEvent, handleChange, modelValue, handleFocus } = useInput({ props, attrs, emit })
// eslint-disable-next-line no-console
console.log('📟 - handleFocus → ', handleFocus)

// const handleFocus = () => yInput.value?.focus()

onMounted(() => {
  if (props.focus && yCheckboxRef.value) {
    // If focus prop is true, focus the input element
    // handleFocus(yCheckboxRef.value as HTMLInputElement)
  }
})
</script>
