<template>
  <tr :class="getClasses">
    <slot>
      <p>YTableRow component</p>
    </slot>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const getClasses = computed(() => {
  return ['y-table-row']
})
</script>
