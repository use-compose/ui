<template>
  <YFlex align="flex-end" gap="0">
    <input
      :id="name"
      :ref="inputRef"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="yInputClasses"
      autocomplete="off"
      :disabled="isDisabled"
      v-on="handleEvent"
    />
    <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>
  </YFlex>
</template>

<script setup lang="ts">
import { EmitFn, useAttrs } from 'vue'

import { YFlex } from '@/components/YFlex'
import { YLabel } from '@/components/YLabel'
import { useComponentProps } from '@/composables/component'
import { useComponentTheme } from '@/composables/component-theme'
import { inputEventsKey, inputEventsKeyInterface } from '@/composables/input'
import { computed, inject } from 'vue'
import './YInput.scss'
import { YInputProps } from './types'

const props = withDefaults(defineProps<YInputProps>(), {
  // ...defineComponentBaseProps,
  name: 'input-' + Math.random().toString(36).substring(7),
  type: 'text',
  placeholder: '',
  inputRef: 'yInput',
})
// const attrs = useAttrs()
const emit: EmitFn = defineEmits(['update:modelValue'])

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
// const { baseClasses, isDisabled } = useComponentTheme(props)
// const yInputClasses = computed(() => {
//   return [
//     ...baseClasses.value,
//     'y-input',
//     props.hero ? 'y-input-hero' : '',
//     ...componentProps.value,
//     props.inputClass ? props.inputClass : [],
//   ]
// })

// Use the base props composable to get common classes and disabled state
const { baseClasses, isDisabled } = useComponentTheme(props)
const attrs = useAttrs()

const { handleEvent, modelValue } = inject(inputEventsKey) as inputEventsKeyInterface

// Apply classes and styles to the input element
const componentProps = useComponentProps({
  class: attrs.class as string | string[] | Record<string, boolean> | undefined,
})

const yInputClasses = computed(() => {
  return [
    ...baseClasses.value,
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
