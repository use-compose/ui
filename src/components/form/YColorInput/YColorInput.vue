<template>
  <YInput ref="inputColor" class="y-color-input-wrapper">
    <YLabel class="y-label" :for="name">{{ label }}</YLabel>
    <input
      :value="modelValue"
      type="color"
      :class="yColorInputClasses"
      :name="name"
      autocomplete="off"
      @change="handleChange"
      @blur="handleBlur"
    />
  </YInput>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YLabel } from '@/components/YLabel'
import { useBaseProps } from '@/composables'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { isClientSide } from '@/utils/is-client-side'
import { computed, onMounted, ref, useAttrs } from 'vue'
import YInput from '../YInput/YInput.vue'
import './YColorInput.scss'

export interface YColorInputProps extends ThemeComponentBaseProps {
  modelValue?: string | null
  label?: string
  name?: string
  small?: boolean
  big?: boolean
  hero?: boolean
  noBorder?: boolean
  noMargin?: boolean
}

const props = withDefaults(defineProps<YColorInputProps>(), {
  name: 'color-input' + Math.random().toString(36).substring(7),
  variant: 'contained',
})

const { baseClasses } = useBaseProps(props)

const yColorInputClasses = computed(() => {
  return [
    [...baseClasses.value],
    'y-color-input',
    props.small ? 'y-input-small' : '',
    props.big ? 'y-input-big' : '',
    props.hero ? 'y-input-hero' : '',
  ]
})

// listen to input event
const emit = defineEmits(['update:modelValue', 'blur', 'change'])

const attrs = useAttrs()

const handleChange = (event: Event) => {
  // If change event emit exists, call it
  if (attrs.onChange) {
    emit('change', event)
  }
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
const inputColor = ref<EventTarget | null>(null)
// const lol = useInputEvent(inputColor)

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
