<template>
  <AppCompose :theme="theme">
    <YFlex align="center" justify="center">
      <YColorInput v-model="primaryColor" label="Primary" />
      <YColorInput v-model="secondaryColor" color="secondary" label="Secondary" />
      <YColorInput v-model="dangerColor" color="danger" label="Danger" />
    </YFlex>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem">
      <!-- <button class="brutalist-button">CLICK ME</button> -->

      <!-- Outer loop: each variant in a separate row or section -->
      <!-- <div v-for="size in sizes.slice().reverse()" :key="size"> -->
      <div v-for="color in colors" :key="color">
        <h3>{{ color }}</h3>
        <!-- Inner loop: each tone for that variant -->
        <!-- Loop: each state -->
        <div v-for="variant in variants" :key="variant" style="margin-bottom: 1rem">
          <div style="display: flex; gap: 1rem; align-items: center; position: relative">
            <small class="variant-label">{{ variant }}</small>
            <!-- If your component has a specific "state" prop, use :state="state" -->
            <!-- If "disabled" is done by a boolean, conditionally set :disabled="(state === 'disabled')" -->
            <div
              v-for="state in states"
              :key="state"
              style="
                text-align: center;
                display: flex;
                gap: 1rem;
                align-items: center;
                flex-grow: 1;
                position: relative;
              "
            >
              <YButton
                :variant="variant"
                :color="color"
                :state="state"
                :disabled="state === 'disabled'"
              >
                <!-- Button label can display the state, e.g. "hover", "focus", etc. -->
                {{ state }}
              </YButton>
            </div>
          </div>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </AppCompose>
</template>

<script setup lang="ts">
import { AppCompose, YButton, YColorInput, YFlex } from '@/components'
import { basePropsDefault } from '@/composables/component-theme'
import { useTheme } from '@/composables/theme'
import { colors, states, variants } from '@/composables/theming'
import './YButtonOverview.css'
import { YButtonOverviewProps } from './types'

// useTheme()

withDefaults(defineProps<YButtonOverviewProps>(), {
  ...basePropsDefault,
})

const [primaryColor] = defineModel<string, string>('primaryColor', {
  set(value: string) {
    return setPrimaryColor(value)
  },
})

const secondaryColor = defineModel<string, string>('secondaryColor', {
  set(value: string) {
    return setSecondaryColor(value)
  },
})

const dangerColor = defineModel<string, string>('dangerColor', {
  set(value: string) {
    return setDangerColor(value)
  },
})

const { setPrimary, setSecondary, setDanger, theme } = useTheme()

const setPrimaryColor = (color: string) => {
  // primaryColor.value = color
  setPrimary(color)
  return color
}

const setSecondaryColor = (color: string) => {
  // secondaryColor.value = color
  setSecondary(color)
  return color
}

const setDangerColor = (color: string) => {
  // dangerColor.value = color
  setDanger(color)
  return color
}
</script>
