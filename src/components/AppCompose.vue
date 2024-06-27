<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useComposeTheme, useTheme } from '@/composables/use-compose-theme'
import { YTheme } from '@/types'

interface AppComposeProps {
  theme?: YTheme
}

const props = defineProps<AppComposeProps>()

if (props.theme) {
  useComposeTheme(props.theme)
} else {
  useComposeTheme()
}

useTheme()
// setPrimary('#FCECF0')
// setBackground('#ABCDF8')
</script>
