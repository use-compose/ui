<template>
  <div class="app-compose" data-compose-ui="app" :style="styles">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/global.css'
import { useComposeTheme } from '@/composables/theme'
import { computed } from 'vue'
import './AppCompose.css'
import { AppComposeProps } from './AppCompose.types'
import { resolveComposeBg } from './resolve-bg'

const props = defineProps<AppComposeProps>()

const styles = computed(() => {
  const bg = resolveComposeBg(props.useBg)

  return {
    '--use-bg': bg ? 1 : 0,
    // Left unset when there is no background so `.app-compose` keeps its
    // `transparent` fallback instead of painting one.
    '--app-compose-bg': bg,
  }
})

if (props.theme) {
  useComposeTheme(props.theme)
} else {
  useComposeTheme()
}
</script>
