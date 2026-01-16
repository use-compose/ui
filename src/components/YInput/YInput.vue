<template>
  <input
    :id="name"
    ref="inputRef"
    :value="modelValue"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :class="yInputClasses"
    autocomplete="off"
    :disabled="isDisabled"
    data-compose-ui
    v-on="handleEvent"
  />
  <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>
</template>

<script setup lang="ts">
import { useAttrs, useTemplateRef } from 'vue'

import { YLabel } from '@/components/YLabel'
import { useColor, useRaw, useSize, useState, useVariant } from '@/composables'
import { useComponentProps } from '@/composables/component'
import { inputEventsKey, inputEventsKeyInterface } from '@/composables/input'
import { computed, inject } from 'vue'
import './YInput.css'
import { YInputProps } from './types'

const props = withDefaults(defineProps<YInputProps>(), {
  // ...defineComponentBaseProps,
  name: 'input-' + Math.random().toString(36).substring(7),
  type: 'text',
  placeholder: '',
})

const inputRef = useTemplateRef<HTMLInputElement | null>('inputRef')
defineExpose({
  inputRef,
})
// const attrs = useAttrs()

// const { modelValue } = useInput({
//   props,
//   attrs,
//   emit,
// })

// // If YInput is used from another component, it will inject the input events
// const injectEvents = inject(inputEventsKey) as inputEventsKeyInterface

// if (injectEvents?.handleEvent === undefined) {
//   // eslint-disable-next-line no-console
//   console.warn('The YInput component is used natively')
// } else {
//   // eslint-disable-next-line no-console
// }

// const componentProps = useComponentProps({
//   class: attrs.class as string | string[] | Record<string, boolean> | undefined,
// })
//   const { variantClass } = useVariant(props)

// const yInputClasses = computed(() => {
//   return [

//     'y-input',
//     props.hero ? 'y-input-hero' : '',
//     ...componentProps.value,
//     props.inputClass ? props.inputClass : [],
//   ]
// })

// Use the base props composable to get common classes and disabled state
const { variantClass } = useVariant(props)
const { stateClass, isDisabled } = useState(props)
const { colorClass } = useColor(props)
const { sizeClass } = useSize(props)
const { rawClasses } = useRaw(props)
const attrs = useAttrs()

const { handleEvent, modelValue } = inject(inputEventsKey) as inputEventsKeyInterface

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
    // props.noBorder ? 'no-border' : '',
    // props.noMargin ? 'no-margin' : '',
  ]
})

// function handleLocalEvent(event: Event) {
//   if (handleEvent) {
//     handleEvent(event)
//   } else {
//     if (isDisabled.value) {
//       event.preventDefault()
//     } else {
//       emit('update:modelValue', (event.target as HTMLInputElement).value)
//     }
//   }
// }
</script>
