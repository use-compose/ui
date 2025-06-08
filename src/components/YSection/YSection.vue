<template>
  <div class="y-section">
    <YVerticalTitle v-if="title" class="y-section__title">
      <YHighlightedText>{{ title }}</YHighlightedText>
    </YVerticalTitle>
    <div class="y-section__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { YHighlightedText } from '../YHighlightedText'
import { YVerticalTitle } from '../YVerticalTitle'
import './YSection.css'
import './YSection.scss'

interface Props {
  title?: string
}
defineProps<Props>()
</script>
