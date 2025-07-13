<template>
  <p class="y-vertical-title" :class="small && 'small'">
    <slot />
  </p>
</template>

<script setup lang="ts">
import './YVerticalTitle.scss'
import type { YVerticalTitleProps } from './YVerticalTitle.types'

withDefaults(defineProps<YVerticalTitleProps>(), {
  small: false,
})
</script>
