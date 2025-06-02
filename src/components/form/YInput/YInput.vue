<template>
  <div class="y-input-wrapper" :class="isDisabled ? 'disabled' : ''">
    <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>
    <!-- <input
      ref="yInput"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="yInputClasses"
      autocomplete="off"
      :disabled="isDisabled"
      v-on="{
        change: handleChange,
        input: handleInput,
        blur: handleBlur,
        update: updateModelValue,
      }"
    /> -->
    <!-- <input v-bind="{ ...props, ...$attrs }" :class="yInputClasses" ref="yInput" /> -->
    <slot
      v-bind="{
        handleChange,
        handleInput,
        handleBlur,
        updateModelValue,
        modelValue,
      }"
    />
    <!-- <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label> -->
  </div>
</template>

<script lang="ts" setup generic="T">
// TODO: resolve alias
import { YLabel } from '@/components/YLabel'
import { useBaseProps } from '@/composables'
import { useComponentProps } from '@/composables/component'
import { useInput } from '@/composables/input'
import { computed, useAttrs } from 'vue'
import type { YInputProps } from './types'
import './YInput.scss'

// This is the setup function for the component
const props = defineProps<YInputProps>()
const { baseClasses, isDisabled } = useBaseProps(props)
const attrs = useAttrs()
const emit = defineEmits()

const inputEvents = useInput({
  props,
  attrs,
  emit,
})
console.log('📟 - attrs → ', attrs)
const componentProps = useComponentProps({
  class: attrs.class,
})

const yInputClasses = computed(() => {
  return [
    baseClasses.value,
    'y-input',
    props.hero ? 'y-input-hero' : '',
    componentProps.value,
    // props.noBorder ? 'no-border' : '',
    // props.noMargin ? 'no-margin' : '',
  ]
})

// const inputEvents = inject(inputEventsKey) as InputEventsKeyInterface
console.log('📟 - onChange → ', inputEvents)
// focus prop
// const yInput = context.refs.yInput as HTMLInputElement | null
// yInput?.focus()

// const handleChange = (event: Event) => {
//   if (isDisabled) {
//     event.preventDefault()
//   } else {
//     emit('update:modelValue', (event.target as HTMLInputElement).value)
//   }
// }

// const handleInput = (event: Event) => {
//   if (isDisabled) {
//     event.preventDefault()
//   } else {
//     emit('update:modelValue', (event.target as HTMLInputElement).value)
//   }
// }

// // listen to blur event
// const handleBlur = () => {
//   if (isDisabled) {
//     return
//   }
//   emit('blur')
// }

// // focus prop
// const yInput = ref<HTMLInputElement | null>(null)
// const handleFocus = () => yInput.value?.focus()

// onMounted(() => {
//   if (props.focus) {
//     handleFocus()
//   }
// })

const { updateModelValue, handleChange, handleInput, handleBlur, modelValue } = inputEvents

// const { eventsToEmit, triggerEvent } = useDynamicEmits(attrs)
// console.log('📟 - eventsToEmit → ', eventsToEmit)

// eventsToEmit?.forEach((event: string) => {
//   console.log('📟 - event → ', event)
//   console.log('📟 - attrs[event] → ', attrs[event])
//   // console.log('📟 - event → ', event)
//   // console.log('📟 - attrs[event] → ', attrs[event])
// })
// // if (attrs[eventsToEmit]) {
// //   console.log('📟 - eventsToEmit → ', eventsToEmit)
// //   console.log('📟 - triggerEvent → ', triggerEvent)
// // }
// // console.log('📟 - eventsToEmit → ', eventsToEmit)
// // listen to input event
// // const emit = defineEmits(eventsToEmit)

// // const eventToEmits = att

// function handleEvent(event: Event) {
//   console.log('📟 - event → ', event)
//   // If change event emit exists, call it
//   if (attrs[event]) {
//     // console.log('📟 - eventToEmits → ', eventToEmits)
//     // console.log('📟 - attrs[event] → ', attrs[event])
//     // @ts-ignore
//     const isCustomEvent = event.replace(/^on/, '').toLowerCase()
//     triggerEvent(isCustomEvent, attrs[event])
//   }
//   // emit('update:modelValue', (event.target as HTMLInputElement).value)
// }
</script>
