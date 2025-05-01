<template>
  <label v-if="label" :for="name" class="y-label">{{ label }} :</label>
  <input ref="yInput" :value="modelValue" :type="type" :name="name" :placeholder="placeholder" :class="yInputClasses" autocomplete="off" @input="handleInput" @blur="handleBlur" />
  <label v-if="error" class="error-label" :for="name">
    {{ errorMsg }}
  </label>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { useBaseProps } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { computed, onMounted, ref } from 'vue'
import type { YInputProps } from './types'
import './YInput.scss'

const props = withDefaults(defineProps<YInputProps>(), {
  ...basePropsDefault,
  modelValue: '',
})

const { baseClasses } = useBaseProps(props)

const yInputClasses = computed(() => {
  return [
    [...baseClasses.value],
    'y-input',
    props.hero ? 'y-input-hero' : '',
    // props.noBorder ? 'no-border' : '',
    // props.noMargin ? 'no-margin' : '',
  ]
})

// listen to input event
const emit = defineEmits(['update:modelValue', 'blur'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
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
