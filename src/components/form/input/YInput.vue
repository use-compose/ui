<template>
  <label v-if="label" :for="name" class="y-label">{{ label }} :</label>
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
</template>

<script setup lang="ts">
// TODO: resolve alias
import { useBaseComponent } from '@/composables'
import { ThemeComponentBaseProps } from '@/utils/base-props'
import { computed, onMounted, ref } from 'vue'

export interface YInputProps extends ThemeComponentBaseProps {
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

const props = defineProps<YInputProps>()

const { baseClasses } = useBaseComponent(props)

const yInputClasses = computed(() => {
  return [
    ...baseClasses.value,
    'y-input',
    props.small ? 'y-input--small' : '',
    props.big ? 'y-input--big' : '',
    props.hero ? 'y-input--hero' : '',
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
    console.log(yInput)
    handleFocus()
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/utils';

.y-label {
  color: color(primary);
  font-size: text(lg);
  margin: space(xs) 0 space(xxs);
  display: inline-block;
}

.y-input {
  @include theme-component;
  @include interactive-component;
  @include component(bg-color, color(main-dark));
  @include component(color, color(primary));
  @include component(padding-y, space(sm));

  margin-bottom: space(unit);
  width: 100%;
  border-color: color(primary);

  &::placeholder {
    color: inherit;
    opacity: 0.4;
  }

  &.y-input--hero {
    @include component(bg, color(primary));
    @include component(color, color(main-dark));
    @include component(box-shadow, unset);
    @include component(padding-y, space(md));
    @include component(padding-x, space(md));
    @include component(font-size, text(xl));

    &:hover:not(:focus-visible, :active) {
      @include component(box-shadow, component(box-shadow-base));
    }
  }

  &.y-input--small {
    padding: space(xs);

    @include component(padding-y, space(xs));
    @include component(padding-x, space(xs));
  }

  &.y-input--big {
    @include component(padding-y, space(unit));
  }
}

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
