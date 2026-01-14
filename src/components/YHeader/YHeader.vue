<template>
  <header :class="getClasses">
    <template v-if="title">
      <a :href="titleLink">
        <h1 class="app-title">{{ title }}</h1>
      </a>
    </template>

    <template v-if="$slots.left">
      <div class="y-header__left">
        <slot name="left" />
      </div>
    </template>

    <template v-if="$slots.right">
      <div class="y-header__right">
        <slot name="right" />
      </div>
    </template>

    <!-- <div class="y-header-relative-height"></div> -->
  </header>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import type { YHeaderProps } from './types'
import './YHeader.css'

const props = withDefaults(defineProps<YHeaderProps>(), {
  fixed: true,
  transparent: true,
})

const getClasses = computed(() => {
  return [
    'y-header',
    'switch-color',
    {
      'y-header-fixed': props.fixed,
      'y-header-transparent': props.transparent,
    },
  ]
})
</script>
