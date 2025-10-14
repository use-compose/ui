<template>
  <div class="app-compose" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/global.css'
// import '@/assets/css/global.css'
import { useComposeTheme } from '@/composables/theme'
import { computed } from 'vue'
import { AppComposeProps } from './AppCompose.types'

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
