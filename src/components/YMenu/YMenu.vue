<template>
  <YFlex
    direction="column"
    justify="flex-start"
    align="flex-start"
    gap="--space-xs"
    class="y-menu w-full primary base"
    :style="getStyles"
  >
    <slot></slot>
  </YFlex>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import YFlex from '../YFlex/YFlex.vue'
import './YMenu.css'
import { YMenuProps } from './YMenu.types'

const props = withDefaults(defineProps<YMenuProps>(), {
  zIndex: 900,
})

const getStyles = computed(() => {
  return {
    zIndex: props.zIndex,
  }
})
</script>
