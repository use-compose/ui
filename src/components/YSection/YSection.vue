<template>
  <div class="y-section">
    <YVerticalTitle v-if="title" class="y-section__title">
      {{ title }}
    </YVerticalTitle>
    <YContainer>
      <slot />
    </YContainer>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import YContainer from '../YContainer/YContainer.vue'
import { YVerticalTitle } from '../YVerticalTitle'
import './YSection.css'

interface Props {
  title?: string
}
defineProps<Props>()
</script>
