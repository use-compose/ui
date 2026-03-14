<template>
  <YInput
    v-bind="props"
    v-model="modelValue"
    type="color"
    input-class="y-color-input"
    :name="name"
    autocomplete="off"
    :label="label"
    @change="onEvent"
    @blur="onEvent"
  >
  </YInput>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YInput } from '@/components/YInput'
import { useInput } from '@/composables/input'
import { isClientSide } from '@/utils/is-client-side'
import { computed, EmitFn, onMounted, ref, useAttrs, watch } from 'vue'
import './YColorInput.css'
import { YColorInputProps } from './types'

const props = withDefaults(defineProps<YColorInputProps>(), {
  name: 'color-input' + Math.random().toString(36).substring(7),
  variant: 'contained',
})

// listen to input event
const emit: EmitFn = defineEmits(['update:modelValue', 'change'])

const attrs = useAttrs()

const inputValue = ref(props.modelValue || '#000000')

const isInputChanged = ref(false)
const isInputBlurred = ref(false)

function onEvent(event: Event) {
  if (event.type === 'change') {
    const target = event.target as HTMLInputElement
    inputValue.value = target.value
    isInputChanged.value = true
  }
  if (event.type === 'blur') {
    isInputBlurred.value = true
  }
}

const isColorPicked = computed(() => {
  return isInputChanged.value && !isInputBlurred.value
})

watch(isColorPicked, (newValue) => {
  if (newValue) {
    emit('change', inputValue.value)
    emit('update:modelValue', inputValue.value)
  }
})
// const handleChange = (event: Event) => {
//   // If change event emit exists, call it
//   if (attrs.onChange) {
//     emit('change', event)
//   }
//   emit('update:modelValue', (event.target as HTMLInputElement).value)
// }
// const lol = useInputEvent(inputColor)
const { modelValue, handleChange, handleBlur } = useInput({ props, attrs, emit })

onMounted(() => {
  if (isClientSide()) {
    // const primaryColor = document.documentElement.style.getPropertyValue('--color-primary')
    // emit('update:modelValue', primaryColor)
  }
})
</script>
