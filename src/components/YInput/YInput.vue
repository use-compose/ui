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
      v-on="injectEvents ? injectEvents : attrs"
      @:[event]="handleEvent"
      @update:modelValue="handleLocalEvent"
    />
    <YLabel v-if="label" class="y-label" :for="name">{{ label }}</YLabel>

    <!-- <input v-on="$attrs" :class="yInputClasses" ref="yInput" /> -->
    <!-- <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label> -->
  </YFlex>
</template>

<script setup lang="ts">
import { YFlex } from '@/components/YFlex'
import { YLabel } from '@/components/YLabel'
import { useComponentProps } from '@/composables/component'
import { useComponentTheme } from '@/composables/component-theme'
import { inputEventsKey, inputEventsKeyInterface } from '@/composables/input'
import { computed, inject, useAttrs } from 'vue'
import type { YInputProps } from './types'
import './YInput.scss'

const props = withDefaults(defineProps<YInputProps>(), {
  // ...defineComponentBaseProps,
  name: 'input-' + Math.random().toString(36).substring(7),
  type: 'text',
  placeholder: '',
  inputRef: 'yInput',
})

const attrs = useAttrs()

// If YInput is used from another component, it will inject the input events
const injectEvents = inject(inputEventsKey) as inputEventsKeyInterface

if (injectEvents?.handleEvent === undefined) {
  // eslint-disable-next-line no-console
  console.warn('The YInput component is used natively')
} else {
  // eslint-disable-next-line no-console
  const { handleEvent } = injectEvents
}

const componentProps = useComponentProps({
  class: attrs.class as string | string[] | Record<string, boolean> | undefined,
})
const { baseClasses, isDisabled } = useComponentTheme(props)
const yInputClasses = computed(() => {
  return [
    ...baseClasses.value,
    'y-input',
    props.hero ? 'y-input-hero' : '',
    ...componentProps.value,
    props.inputClass ? props.inputClass : [],
  ]
})

const emit = defineEmits(['update:modelValue'])

function handleLocalEvent(event: Event) {
  if (injectEvents && injectEvents?.handleEvent) {
    injectEvents.handleEvent(event)
  } else {
    if (isDisabled.value) {
      event.preventDefault()
    } else {
      emit('update:modelValue', (event.target as HTMLInputElement).value)
    }
  }
}
</script>
<!-- <script lang="ts" generic="T">
// TODO: resolve alias
import { YLabel } from '@/components/YLabel'
import { useComponentTheme } from '@/composables'
import { useComponentProps } from '@/composables/component'
import { inputEventsKey, inputEventsKeyInterface } from '@/composables/input'
import { defineComponentBaseProps } from '@/composables/use-base-props'
import { computed, defineComponent, inject, ref, SetupContext, useAttrs } from 'vue'
import { YFlex } from '../layout/YFlex'
import type { YInputProps } from './types'
import './YInput.scss'

export default defineComponent({
  name: 'YInput',
  components: {
    YLabel,
    YFlex,
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
    const { baseClasses, isDisabled } = useComponentTheme(props)
    const attrs = useAttrs()
    const yInput = ref<HTMLInputElement | null>(null)

    const injec = inject(inputEventsKey) as inputEventsKeyInterface
    console.log('📟 - qsdqsd → ', qsdqsd)

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
}) -->
