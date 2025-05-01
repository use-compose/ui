<template>
  <div class="baseClasses" style="display: flex; flex-direction: column; gap: 2rem">
    <!-- Outer loop: each variant in a separate row or section -->
    <div v-for="tone in colors" :key="tone">
      <h3>{{ tone.toUpperCase() }}</h3>

      <!-- Inner loop: each tone for that variant -->
      <div v-for="variant in variants" :key="variant" style="margin-bottom: 1rem">
        <h3>{{ variant }}</h3>

        <!-- Loop: each state -->
        <div style="display: flex; gap: 1rem">
          <div v-for="state in sizes" :key="state" style="text-align: center">
            <!-- If your component has a specific "state" prop, use :state="state" -->
            <!-- If "disabled" is done by a boolean, conditionally set :disabled="(state === 'disabled')" -->
            <YButton :variant="variant" :tone="tone" :class="'-' + state">
              <!-- Button label can display the state, e.g. "hover", "focus", etc. -->
              {{ state }}
            </YButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { YButton } from '@/components'
import { basePropsDefault } from '@/composables/use-base-props'
import { colors, sizes, ThemeComponentBaseProps, variants } from '@/types/base-props'

export interface YButtonOverviewProps extends ThemeComponentBaseProps {}

withDefaults(defineProps<YButtonOverviewProps>(), {
  ...basePropsDefault,
})

// const { baseClasses } = useBaseProps(props)

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
