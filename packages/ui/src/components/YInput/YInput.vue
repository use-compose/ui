<template>
  <input
    :id="name"
    ref="inputRef"
    :type="type"
    :value="model"
    :name="name"
    :placeholder="placeholder"
    :class="yInputClasses"
    :autocomplete="autocomplete"
    :disabled="isDisabled"
    data-compose-ui="block"
    v-bind="ariaAttrs"
    @input="onInput"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
  />
  <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>
</template>

<script setup lang="ts">
import { useAttrs, useTemplateRef } from 'vue'

import { YLabel } from '@/components/YLabel'
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { useComponentProps } from '@/composables/component'
import { computed } from 'vue'
import './YInput.css'
import { YInputProps } from './types'

const props = withDefaults(defineProps<YInputProps>(), {
  name: 'input-' + Math.random().toString(36).substring(7),
  type: 'text',
  placeholder: '',
  autocomplete: 'off',
})

const emit = defineEmits(['input', 'change', 'focus', 'blur'])

const inputRef = useTemplateRef<HTMLInputElement | null>('inputRef')
defineExpose({
  inputRef,
})

const model = defineModel<string | number | boolean>()

// Forward non-class/style fallthrough attributes (e.g. aria-label) to the native input,
// since a multi-root template disables Vue's automatic attribute inheritance.
const ariaAttrs = computed(() => {
  return Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'),
  )
})

// Use the base props composable to get common classes and disabled state
const { variantClass } = useVariant(props)
const { stateClass, isDisabled } = useState(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)
const attrs = useAttrs()

// Apply classes and styles to the input element
const componentProps = useComponentProps({
  class: attrs.class as string | string[] | Record<string, boolean> | undefined,
})

const yInputClasses = computed(() => {
  return [
    variantClass.value,
    stateClass.value,
    colorClass.value,
    sizeClass.value,
    rawClasses.value,

    'y-input',
    props.hero ? 'y-input-hero' : '',
    ...componentProps.value,
    props.inputClass ? props.inputClass : [],
  ]
})

function valueFromEvent(event: Event): string | number | boolean {
  const target = event.target as HTMLInputElement
  return target.type === 'checkbox' ? target.checked : target.value
}

function onInput(event: Event) {
  const value = valueFromEvent(event)
  model.value = value
  emit('input', value)
}

function onChange(event: Event) {
  const value = valueFromEvent(event)
  model.value = value
  emit('change', value)
}

function onFocus(event: FocusEvent) {
  emit('focus', valueFromEvent(event))
}

function onBlur(event: FocusEvent) {
  emit('blur', valueFromEvent(event))
}
</script>
