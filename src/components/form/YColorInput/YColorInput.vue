<template>
  <div class="y-color-input-wrapper">
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
  </div>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { YLabel } from '@/components/YLabel'
import { useBaseProps } from '@/composables'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { isClientSide } from '@/utils/is-client-side'
import { computed, onMounted, useAttrs } from 'vue'
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
    // props.noBorder ? 'no-border' : '',
    // props.noMargin ? 'no-margin' : '',
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

// listen to blur event
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
