<template>
  <YRow type="switcher" class="y-section">
    <YVerticalTitle v-if="title" class="y-section__title">
      {{ title }}
    </YVerticalTitle>
    <Wrapper>
      <slot />
    </Wrapper>
  </YRow>
</template>

<script setup lang="ts">
import { YRow } from '../cube'
import Wrapper from '../Wrapper.vue'
import { YVerticalTitle } from '../YVerticalTitle'
import './YSection.css'

interface Props {
  title?: string
}
defineProps<Props>()
</script>
