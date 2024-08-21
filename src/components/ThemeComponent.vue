<template>
  <ThemeComponent />
</template>

<script lang="ts" setup>
import { ThemeComponentBaseProps } from '@/utils/base-props'
import { computed, defineProps, h } from 'vue'

const props = defineProps<ThemeComponentBaseProps>()

const themeClass = computed(() => {
  return {
    'outlined-class': props.outlined,
    'disabled-class': props.disabled,
    'raw-class': props.raw,
  }
})

function ThemeComponent() {
  return h(
    props.as,
    {
      class: themeClass.value,
    },
    //  slots.default ? slot.default() : []
  )
}
</script>

<style>
.outlined-class {
  border: 1px solid black;
}

.disabled-class {
  opacity: 0.5;
  pointer-events: none;
}
.raw-class {
  background: none;
  border: none;
}
</style>
