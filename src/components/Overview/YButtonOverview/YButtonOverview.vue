<template>
  <div :class="baseClasses" style="display: flex; flex-direction: column; gap: 2rem">
    <!-- <button class="brutalist-button">CLICK ME</button> -->

    <!-- Outer loop: each variant in a separate row or section -->
    <!-- <div v-for="size in sizes.slice().reverse()" :key="size"> -->
    <!-- <h3>{{ size.toUpperCase() }}</h3> -->
    <div v-for="color in colors" :key="color">
      <h3>{{ color }}</h3>
      <!-- Inner loop: each tone for that variant -->
      <div>
        <!-- Loop: each state -->
        <div v-for="variant in variants" :key="variant" style="display: flex; gap: 1rem; align-items: center; position: relative">
          <small class="variant-label">{{ variant }}</small>
          <!-- If your component has a specific "state" prop, use :state="state" -->
          <!-- If "disabled" is done by a boolean, conditionally set :disabled="(state === 'disabled')" -->
          <div v-for="state in states" :key="state" style="text-align: center; display: flex; gap: 1rem; align-items: center; flex-grow: 1; position: relative">
            <YButton :variant="variant" :color="color" :state="state" :disabled="state === 'disabled'">
              <!-- Button label can display the state, e.g. "hover", "focus", etc. -->
              {{ state }}
            </YButton>
          </div>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { YButton } from '@/components'
import { useBaseProps } from '@/composables'
import { basePropsDefault } from '@/composables/use-base-props'
import { colors, states, ThemeComponentBaseProps, variants } from '@/types/base-props'

export interface YButtonOverviewProps extends ThemeComponentBaseProps {}

// useTheme()

const props = withDefaults(defineProps<YButtonOverviewProps>(), {
  ...basePropsDefault,
})

const { baseClasses } = useBaseProps(props)

/*
 * https://stackoverflow.com/a/51529486/13172236 - Check "typeof" against custom type
 */
// // 1.
// const data = [
//   'primary',
//   'secondary',
//   'danger'
// ] as const;

// // 2.
// type SizeType = (typeof data)[number];
</script>
<style lang="scss" scoped>
.variant-label {
  position: absolute;
  inset: 50% 0 0 -1.5rem;
  translate: transform (-100%, -50%);
  color: grey;
}
</style>
