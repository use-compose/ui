<template>
  <div class="app-compose" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
// import '@/assets/css/global.css'
// import '@/assets/css/global.css'
import { useComposeTheme } from '@/composables/theme'
import type { YTheme } from '@/types'
import { computed } from 'vue'

interface AppComposeProps {
  theme?: YTheme
  useBg?: boolean
}

const props = defineProps<AppComposeProps>()

const styles = computed(() => {
  return {
    '--use-bg': props.useBg ? 1 : 0,
  }
})

if (props.theme) {
  useComposeTheme(props.theme)
} else {
  useComposeTheme()
}
</script>
