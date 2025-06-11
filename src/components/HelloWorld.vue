<script setup lang="ts">
import Playground from './Playground.vue'

// useTheme()

defineProps<{ msg: string }>()
</script>

<template>
  <Playground />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.hello {
  /* background-color: var(--primary-60); */
}
</style>
