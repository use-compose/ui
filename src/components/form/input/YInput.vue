<template>
  <div>
    <label v-if="label" :for="name" class="y_label">{{ label }} :</label>
    <input
      ref="input"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="yInputClasses"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
      @change="handleChange"
      @blur="$emit('blur', $event)"
    />
    <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

interface InputProps {
  modelValue: string | null
  label?: string
  name?: string
  placeholder?: string
  type?: string
  small?: boolean
  big?: boolean
  hero?: boolean
  raw?: boolean
  noBorder?: boolean
  noMargin?: boolean
  error?: boolean
  errorMsg?: string
}

const inputRef = ref<HTMLInputElement | null>(null)
const emit = defineEmits(['update:modelValue'])
const props = defineProps<InputProps>()

const yInputClasses = computed(() => {
  return [
    'y-input',
    props.small ? 'small-input' : '',
    props.big ? 'big-input' : '',
    props.raw ? 'raw' : '',
    props.noBorder ? 'no-border' : '',
    props.noMargin ? 'no-margin' : '',
  ]
})

const yInpustClasses = computed(() => {
  return {
    'y-input-classes': true,
    // 'small-input': props.small,
    'no-border': props.noBorder,
    'no-margin': props.noMargin,
  }
})

const handleChange = (event: Event) => {
  console.log('handleChange')
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const focus = () => {
  nextTick(() => inputRef.value?.focus())
}
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';
// @import '../../../assets/scss/utils/breakpoints';

// .y-input-wrapper {
// margin: 20px 0;

.y_label {
  color: var(--primary);
  font-size: #{var(--h4)};
  margin-bottom: 15px;
  display: block;
  height: 22px;
}

.y-input {
  @include theme-component;
  --component-bg: var(--main-dark);
  --component-color: var(--primary);

  padding: var(--space-sm) var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  display: block;
  width: 100%;
  outline: none;
  border-color: var(--primary);

  &::placeholder {
    color: inherit;
    opacity: 0.4;
  }

  &.y-input--hero {
  }
}

.error-label {
  font-size: 80%;
}

.small-input {
  input {
    border-width: 2px;
  }
}

.no-border {
  input {
    border: none;
  }
}

.no-margin {
  margin-bottom: 0;
}
// }
</style>
