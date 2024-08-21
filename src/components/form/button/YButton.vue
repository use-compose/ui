<template>
  <button :class="getClasses" :disabled="disabled" type="button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
// TODO: resolve alias
import { useBaseComponent } from '@/composables/use-base-component'
import { ThemeComponentBaseProps } from '@/utils/base-props'
import { computed, defineProps, withDefaults } from 'vue'

export interface YButtonProps extends ThemeComponentBaseProps {
  color?: string
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<YButtonProps>(), {
  color: 'primary',
  size: 'medium',
})

const { baseClasses } = useBaseComponent(props)

const getClasses = computed(() => {
  return [
    ...baseClasses.value,
    'y-button',
    props.color ? `${props.color}-button` : '',
    props.size ? `-${props.size}` : '',
  ]
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
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: space(unit);
  padding: space(xs) space(unit);

  @include theme-component;
  @include interactive-component;

  // @include component(bg, color(primary));

  @include component(padding-y, space(xs));

  &.-small {
    @include component(padding-y, space(xxs));
    @include component(padding-x, space(xs));
  }

  &.-large {
    @include component(padding-y, space(md));
    @include component(padding-x, space(md));
  }

  // &.y-button--large {
  //   --component-padding-y: space(sm);
  // }
}
</style>
