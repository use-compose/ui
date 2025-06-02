<template>
  <div class="y-checkbox-wrapper">
    <label class="y-label">{{ label }}</label>
    <input
      ref="yCheckbox"
      class="y-checkbox-label"
      :class="yCheckboxClasses"
      :style="!isClickedOnce && '--clicked: none'"
      :value="modelValue"
      type="checkbox"
      :name="name"
      :placeholder="placeholder"
      autocomplete="off"
      :disabled="isDisabled"
      @change="handleEvent($event)"
      @blur="handleBlur"
    />
    <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label>
    <!-- </label> -->
  </div>
</template>

<script setup lang="ts">
import { useBaseProps } from '@/composables'
import { useInputEvent } from '@/composables/animation'
import { basePropsDefault } from '@/composables/use-base-props'
import { computed, onMounted, ref } from 'vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.scss'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  ...basePropsDefault,
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const { baseClasses, isDisabled } = useBaseProps(props)

// const isClickedOnce = ref(false)

const yCheckboxClasses = computed(() => {
  return [[...baseClasses.value], 'y-checkbox', props.hero ? 'y-input-hero' : '']
})

const yCheckbox = ref<EventTarget | null>(null)
// listen to input event
const emit = defineEmits(['update:modelValue', 'blur', 'change'])

const { handleEvent, handleInput } = useInputEvent(yCheckbox)

const handleChange = (event: Event) => {
  // if (!isClickedOnce.value) {
  //   isClickedOnce.value = true
  // }
  if (isDisabled) {
    event.preventDefault()
  } else {
    emit('update:modelValue', !props.modelValue)
  }
}

// listen to blur event
const handleBlur = () => {
  emit('blur')
}

// focus prop
const yInput = ref<HTMLInputElement | null>(null)
const handleFocus = () => yInput.value?.focus()

onMounted(() => {
  if (props.focus) {
    handleFocus()
  }
})
</script>
