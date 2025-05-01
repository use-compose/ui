<template>
  <div class="y-checkbox-wrapper">
    <label class="y-label">{{ label }}</label>
    <input class="y-checkbox-label" :class="yCheckboxClasses" ref="yCheckbox" :value="modelValue" type="checkbox" :name="name" :placeholder="placeholder" autocomplete="off" :disabled="props.disabled" @change="handleChange" @blur="handleBlur" />
    <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label>
    <!-- </label> -->
  </div>
</template>

<script setup lang="ts">
import { useBaseProps } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { computed, onMounted, ref } from 'vue'
import type { YCheckboxProps } from './types'
import './YCheckbox.scss'

const props = withDefaults(defineProps<YCheckboxProps>(), {
  ...basePropsDefault,
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const { baseClasses } = useBaseProps(props)

const yCheckboxClasses = computed(() => {
  return [[...baseClasses.value], 'y-checkbox', props.hero ? 'y-input-hero' : '']
})

// listen to input event
const emit = defineEmits(['update:modelValue', 'blur'])

const handleChange = (event: Event) => {
  if (props.disabled) {
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
    console.log(yInput)
    handleFocus()
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/utils';
</style>
