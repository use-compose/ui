<template>
  <YFlow class="theme-picker" align="center" style="--flex-gap: var(--_spacing-md)">
    <YRow type="cluster">
      <YColorInput v-model="primaryColor" label="primary" name="primary" />
      <YColorInput v-model="secondaryColor" label="secondary" name="secondary" />
      <YColorInput v-model="dangerColor" label="danger" name="danger" />
      <YColorInput v-model="backgroundColor" label="background" name="background" />
      <YButton size="small" style="--component-margin-bottom: 0" @click="randomize">
        Randomize
      </YButton>
    </YRow>
    <YSection v-show="border" title="Border">
      <YRow type="cluster">
        <div>
          <h2>Border</h2>
          <ul>
            <li v-for="(value, name) in border.tokenValues" :key="name">{{ name }}: {{ value }}</li>
          </ul>
        </div>
        <div>
          <p>Color</p>
          <ul>
            <li v-for="(value, name) in color.tokenValues" :key="name">{{ name }}: {{ value }}</li>
          </ul>
        </div>
        <div>
          <p>Font</p>
          <ul>
            <li v-for="(value, name) in font.tokenValues" :key="name">{{ name }}: {{ value }}</li>
          </ul>
        </div>
        <div>
          <p>Spacing</p>
          <ul>
            <li v-for="(value, name) in spacing.tokenValues" :key="name">
              {{ name }}: {{ value }}
            </li>
          </ul>
        </div>
        <div>
          <p>Radius</p>
          <ul>
            <li v-for="(value, name) in radius.tokenValues" :key="name">{{ name }}: {{ value }}</li>
          </ul>
        </div>
        <div>
          <p>Breakpoint Pool</p>
          <ul>
            <li v-for="(value, name) in breakpointPool.tokenValues" :key="name">
              {{ name }}: {{ value }}
            </li>
          </ul>
        </div>
      </YRow>
    </YSection>
    <!-- <YInputText v-model="borderRadiusBase" label="Border Radius Base" /> -->
  </YFlow>
</template>

<script setup lang="ts">
import { YButton } from '@/components'

import { useTheme } from '@/composables'
import { basePropsDefault } from '@/composables/component-theme'
// import { defineProps, withDefaults } from 'vue'
import { useTokens } from '@/composables/use-theme-tokens'
import YFlow from '../cube/YFlow/YFlow.vue'
import YRow from '../cube/YRow/YRow.vue'
import { YColorInput } from '../YColorInput'
import YSection from '../YSection/YSection.vue'
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

const {
  border,
  color,
  font,
  spacing,
  radius,
  'breakpoint-pool': breakpointPool,
} = useTokens(['border', 'color', 'font', 'spacing', 'radius', 'breakpoint-pool'])

// const borderRadiusBase = defineModel<string, string>('borderRadiusBase', {
//   get() {
//     return getToken('border-radius-base') || ''
//   },
//   set(value: string) {
//     setToken('border-radius-base', value)
//     return value
//   },
// })
</script>
