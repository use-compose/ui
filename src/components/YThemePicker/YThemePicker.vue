<template>
  <YFlex class="theme-picker" align="center" style="--flex-gap: var(--_spacing-md)">
    <YColorInput v-model="primaryColor" label="primary" name="primary" />
    <YColorInput v-model="secondaryColor" label="secondary" name="secondary" />
    <YColorInput v-model="dangerColor" label="danger" name="danger" />
    <YColorInput v-model="backgroundColor" label="background" name="background" />
    <YButton size="small" style="--component-margin-bottom: 0" @click="randomize">
      Randomize
    </YButton>
    <p>{{ getToken('border-radius-base') }}</p>
  </YFlex>
</template>

<script setup lang="ts">
import { YButton, YFlex } from '@/components'

import { useTheme } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
// import { defineProps, withDefaults } from 'vue'
import { useThemeTokens } from '@/composables/use-theme-tokens'
import { YColorInput } from '../YColorInput'
import type { YThemePickerProps } from './types'
import './YThemePicker.css'

withDefaults(defineProps<YThemePickerProps>(), {
  ...basePropsDefault,
})

const { setThemeProperty } = useTheme()

const [primaryColor] = defineModel<string, string>('primaryColor', {
  set(value: string) {
    setThemeProperty('primary', value)
    return value
  },
})

const secondaryColor = defineModel<string, string>('secondaryColor', {
  set(value: string) {
    setThemeProperty('secondary', value)
    return value
  },
})

const dangerColor = defineModel<string, string>('dangerColor', {
  set(value: string) {
    setThemeProperty('danger', value)
    return value
  },
})

const backgroundColor = defineModel<string, string>('backgroundColor', {
  set(value: string) {
    setThemeProperty('background', value)
    return value
  },
})

function randomize() {
  const newPrimary = randomHexColorCode()
  const newSecondary = randomHexColorCode()
  const newDanger = randomHexColorCode()
  const newBackground = randomHexColorCode()
  if (import.meta.env.DEV) {
    setThemeProperty('primary', newPrimary)
    setThemeProperty('secondary', newSecondary)
    setThemeProperty('danger', newDanger)
    setThemeProperty('background', newBackground)
    primaryColor.value = newPrimary
    secondaryColor.value = newSecondary
    dangerColor.value = newDanger
    backgroundColor.value = newBackground
  }

  function randomHexColorCode() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    return '#' + n.slice(0, 6)
  }
}

const { getToken } = useThemeTokens()
</script>
