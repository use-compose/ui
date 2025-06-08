<template>
  <div class="y-input-wrapper" :class="isDisabled ? 'disabled' : ''">
    <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>
    <input
      :ref="inputRef"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="yInputClasses"
      autocomplete="off"
      :disabled="isDisabled"
      @:[event]="handleEvent"
    />
    <!-- <input v-on="$attrs" :class="yInputClasses" ref="yInput" /> -->
    <!-- <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label> -->
  </div>
</template>

<script lang="ts" generic="T">
// TODO: resolve alias
import { YLabel } from '@/components/YLabel'
import { useBaseProps } from '@/composables'
import { useComponentProps } from '@/composables/component'
import { inputEventsKey, inputEventsKeyInterface } from '@/composables/input'
import { defineComponentBaseProps } from '@/composables/use-base-props'
import { computed, defineComponent, inject, ref, SetupContext, useAttrs } from 'vue'
import type { YInputProps } from './types'
import './YInput.scss'

export default defineComponent({
  name: 'YInput',
  components: {
    YLabel,
  },
  props: {
    ...defineComponentBaseProps,
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'input-' + Math.random().toString(36).substring(7),
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    hero: {
      type: Boolean,
      default: false,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: [String, Array],
      default: '',
    },
    inputRef: {
      type: String,
      default: 'yInput',
    },
  },
  setup(props: YInputProps, context: SetupContext) {
    // eslint-disable-next-line no-console
    console.log('📟 - context → ', context)
    // Use the base props composable to get common classes and disabled state
    const { baseClasses, isDisabled } = useBaseProps(props)
    const attrs = useAttrs()
    const yInput = ref<HTMLInputElement | null>(null)

    const { handleEvent, modelValue } = inject(inputEventsKey) as inputEventsKeyInterface

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

    // const inputEvents = inject(inputEventsKey) as InputEventsKeyInterface
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
    return {
      yInput,
      yInputClasses,
      isDisabled,
      handleEvent,
      modelValue,
      props,
      // handleChange,
      // handleInput,
      // handleBlur,
      // handleFocus,
      // emit: context.emit,
      // modelValue: props.modelValue,
      // attrs: context.attrs,
    }
    // const { updateModelValue, handleChange, handleInput, handleBlur, modelValue } = inputEvents
  },
})
// This is the setup function for the component

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
