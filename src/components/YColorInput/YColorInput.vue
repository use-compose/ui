<template>
  <YInput
    v-bind="props"
    :value="modelValue"
    type="color"
    input-class="y-color-input"
    :name="name"
    autocomplete="off"
    :label="label"
    @change="handleChange"
    @blur="handleBlur"
  >
  </YInput>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { isClientSide } from '@/utils/is-client-side'
import { EmitFn, onMounted, useAttrs } from 'vue'
import './YColorInput.scss'
import { YColorInputProps } from './types'

const props = withDefaults(defineProps<YColorInputProps>(), {
  name: 'color-input' + Math.random().toString(36).substring(7),
  variant: 'contained',
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'blur', 'change'])

const attrs = useAttrs()

// const handleChange = (event: Event) => {
//   // If change event emit exists, call it
//   if (attrs.onChange) {
//     emit('change', event)
//   }
//   emit('update:modelValue', (event.target as HTMLInputElement).value)
// }
// const lol = useInputEvent(inputColor)
const { modelValue, handleChange } = useInput({ props, attrs, emit })

const handleBlur = () => {
  emit('blur')
}

onMounted(() => {
  if (isClientSide()) {
    // const primaryColor = document.documentElement.style.getPropertyValue('--color-primary')
    // emit('update:modelValue', primaryColor)
  }
})
</script>
