<template>
  <div :class="columnClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import './YColumn.scss'

const columnClasses = computed(() => {
  return ['yColumn']
})
</script>
