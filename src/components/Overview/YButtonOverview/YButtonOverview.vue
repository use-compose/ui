<template>
  <YFlex align="center">
    <YColorInput v-model="primaryColor" label="Primary" />
    <YColorInput v-model="secondaryColor" color="secondary" label="Secondary" />
    <YColorInput v-model="dangerColor" color="danger" label="Danger" />
  </YFlex>
  <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem">
    <!-- <button class="brutalist-button">CLICK ME</button> -->

    <!-- Outer loop: each variant in a separate row or section -->
    <!-- <div v-for="size in sizes.slice().reverse()" :key="size"> -->
    <!-- <h3>{{ size.toUpperCase() }}</h3> -->
    <div v-for="color in colors" :key="color">
      <h3 :class="color">{{ color }}</h3>
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
</template>

<script setup lang="ts">
import { YButton, YColorInput, YFlex } from '@/components'
import { useTheme } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { colors, states, ThemeComponentBaseProps, variants } from '@/types/base-props'

export interface YButtonOverviewProps extends ThemeComponentBaseProps {}

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

const { setPrimary, setSecondary, setDanger } = useTheme()

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
<style lang="scss" scoped>
.variant-label {
  position: absolute;
  top: 50%;
  left: -1.5rem;
  transform: translate(-100%, -50%);
  color: grey;
}
</style>
