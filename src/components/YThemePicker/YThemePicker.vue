<template>
  <YFlex class="theme-picker" align="center" style="--flex-gap: var(--space-md)">
    <YColorInput v-model="primaryColor" label="primary" name="primary" />
    <YColorInput v-model="bgColor" label="background" name="background" />
    <YButton size="small" style="--component-margin-bottom: 0" @click="randomize">
      Randomize
    </YButton>
  </YFlex>
</template>

<script setup lang="ts">
import { YButton, YFlex } from '@/components'

import { useTheme } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { defineProps, ref, withDefaults } from 'vue'
import { YColorInput } from '../YColorInput'
import type { YThemePickerProps } from './types'
import './YThemePicker.scss'

withDefaults(defineProps<YThemePickerProps>(), {
  ...basePropsDefault,
})

const { theme, setPrimary, setBackground } = useTheme()

const primaryColor = ref(theme.value.primary)
const bgColor = ref(theme.value.background)

function randomize() {
  const newPrimary = randomHexColorCode()
  const newBackground = randomHexColorCode()
  if (import.meta.env.DEV) {
    setPrimary(newPrimary)
    setBackground(newBackground)
    primaryColor.value = newPrimary
    bgColor.value = newBackground
  }

  function randomHexColorCode() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }
}
</script>

<style lang="scss" scoped>
.theme-picker {
  justify-content: center;
}
.theme-hint {
  flex-basis: 100%;
  text-align: center;
}

@media (min-width: 768px) {
  .theme-picker {
    justify-content: normal;
  }

  .theme-hint {
    flex-basis: auto;
    margin-bottom: 0;
  }
}
</style>
