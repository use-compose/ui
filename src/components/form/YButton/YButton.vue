<template>
  <button :class="getClasses" :disabled="props.disabled" type="button" @click="handleClick">
    <slot>YButton</slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { basePropsDefault, useBaseProps } from '@/composables/use-base-props'
import { ThemeComponentBaseProps } from '@/types/base-props'
import { computed, defineProps, withDefaults } from 'vue'

export interface YButtonProps extends ThemeComponentBaseProps {}

const props = withDefaults(defineProps<YButtonProps>(), {
  ...basePropsDefault,
})

const { baseClasses } = useBaseProps(props)

const getClasses = computed(() => {
  return [[...baseClasses.value], 'y-button']
})

// listen to click event
const emit = defineEmits(['click'])

const handleClick = (e: Event) => {
  if (props.disabled) {
    e.preventDefault()
  } else {
    emit('click', e)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/utils';

.y-button {
  height: y-btn(height);
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: space(unit);

  @include y-btn(height, component(height));
  @include theme-component;

  &.-small {
    @include component(padding-x, space(sm));
    // @include y-btn(height, compone);
  }
}
</style>
