<script setup lang="ts">
import TestLol from './TestLol.vue'

// useTheme()

defineProps<{ msg: string }>()
</script>

<template>
  <TestLol />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.hello {
  /* background-color: var(--primary-60); */
}
</style>
