<template>
  <YRow type="switcher" class="y-section">
    <YVerticalTitle v-if="title" class="y-section__title">
      {{ title }}
    </YVerticalTitle>
    <YWrapper>
      <slot />
    </YWrapper>
  </YRow>
</template>

<script setup lang="ts">
import { YRow, YWrapper } from '../cube'
import { YVerticalTitle } from '../YVerticalTitle'
import './YSection.css'

interface Props {
  title?: string
}
defineProps<Props>()
</script>
