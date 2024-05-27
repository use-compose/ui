<template>
  <div>
    <label v-if="label" :for="name" class="y_label">{{ label }} :</label>
    <input
      ref="yInput"
      :value="modelValue"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :class="yInputClasses"
      autocomplete="off"
      @input="handleInput"
      @blur="handleBlur"
    />
    <label v-if="error" class="error-label" :for="name">
      {{ errorMsg }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { useBaseComponent } from '@/composables/use-base-component'
import { BaseProps } from '@/utils/base-props'
import { computed, onMounted, ref } from 'vue'

interface InputProps extends BaseProps {
  modelValue: string | null
  label?: string
  name?: string
  placeholder?: string
  type?: string
  small?: boolean
  big?: boolean
  hero?: boolean
  noBorder?: boolean
  noMargin?: boolean
  error?: boolean
  errorMsg?: string
  focus?: boolean
}

const props = defineProps<InputProps>()

const { baseClasses } = useBaseComponent(props)

const yInputClasses = computed(() => {
  return [
    ...baseClasses.value,
    'y-input',
    props.small ? 'y-input--small' : '',
    props.big ? 'y-input--big' : '',
    // props.noBorder ? 'no-border' : '',
    // props.noMargin ? 'no-margin' : '',
  ]
})

// listen to input event
const emit = defineEmits(['update:modelValue', 'blur'])

const handleInput = (event: Event) => {
  console.log('handleChange')
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
    console.log(yInput)
    handleFocus()
  }
})
</script>

<style lang="scss" scoped>
// TODO: https://www.notion.so/guido-web-training/Storybook-and-Vite-Global-SCSS-Variables-are-not-found-31629867a8bd4323b28dee411e3f7c0f?pvs=4
@import '../../../assets/scss/base/base';
// @import '../../../assets/scss/utils/breakpoints';

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
  --component-padding-y: var(--space-sm);

  width: 100%;
  border-color: var(--primary);

  &::placeholder {
    color: inherit;
    opacity: 0.4;
  }

  &.y-input--hero {
    --component-bg: var(--primary);
  }

  &.y-input--small {
    padding: var(--space-xs);
    --component-padding-y: var(--space-xs);
    --component-padding-x: var(--space-xs);
  }

  &.y-input--big {
    --component-padding-y: var(--space-unit);
  }
}

// TODO: check if to keep these 3 classes
.error-label {
  font-size: 80%;
}

.no-border {
  border: none;
}

.no-margin {
  margin-bottom: 0;
}
</style>
