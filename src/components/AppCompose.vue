<template>
  <div class="app-compose">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import '@/assets/css/theme.css'
// import '@/assets/css/global.css'
import { useComposeTheme } from '@/composables/theme'
import type { YTheme } from '@/types'

interface AppComposeProps {
  theme?: YTheme
}

const props = defineProps<AppComposeProps>()

if (props.theme) {
  useComposeTheme(props.theme)
} else {
  useComposeTheme()
}
</script>
