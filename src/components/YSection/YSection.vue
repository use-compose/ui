<template>
  <div class="y-section">
    <YVerticalTitle v-if="title" class="y-section__title">
      {{ title }}
    </YVerticalTitle>
    <div class="y-section__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { YVerticalTitle } from '../YVerticalTitle'
import './YSection.scss'

interface Props {
  title?: string
}
defineProps<Props>()
</script>
