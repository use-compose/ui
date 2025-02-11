<template>
  <div>
    <label class="y-label"
      >{{ label }}s
      <input
        class="y-checkbox-label"
        :class="yCheckboxClasses"
        ref="yCheckbox"
        :value="modelValue"
        type="checkbox"
        :name="name"
        :placeholder="placeholder"
        autocomplete="off"
        :disabled="props.disabled"
        @change="handleChange"
        @blur="handleBlur"
      />
      <label v-if="error" class="error-label" :for="name">
        {{ errorMsg }}
      </label>
    </label>
  </div>
</template>

<script setup lang="ts">
import { useBaseProps } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed, onMounted, ref } from 'vue'

export interface YCheckboxProps extends ThemeComponentBaseProps {
  modelValue?: boolean
  label?: string
  name?: string
  placeholder?: string
  hero?: boolean
  error?: boolean
  errorMsg?: string
  focus?: boolean
}

const props = withDefaults(defineProps<YCheckboxProps>(), {
  ...basePropsDefault,
  name: 'checkbox-input' + Math.random().toString(36).substring(7),
})

const { baseClasses } = useBaseProps(props)

const yCheckboxClasses = computed(() => {
  return [[...baseClasses.value], 'y-checkbox', props.hero ? 'y-input--hero' : '']
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

.y-checkbox {
  @include theme-component;

  @include component(margin-bottom, 0);
  @include component(padding-x, 0);
  @include component(padding-y, 0);
  @include component(padding, 0);
  padding: component(padding);
  height: calc(0.75 * y-checkbox(height));

  @include y-checkbox(height, component(height));

  cursor: pointer;
  position: relative;
  z-index: 1;
  aspect-ratio: 1 / 1;

  margin: 0;
  appearance: none;

  &::before {
    content: '';
    border-color: var(--color-primary);
    display: flex;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    width: var(--width);
    height: var(--height);
    position: absolute;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
  }

  &:checked::before {
    animation: checked-in 0.3s 0s forwards;
  }

  &:not(:checked)::before {
    animation: checked-out 0.3s 0s forwards;
  }
}
</style>
