<template>
  <AppCompose :theme="theme" :use-bg="true">
    <!-- <ModalProvider> -->
    <Playground />
    <!-- </ModalProvider> -->
  </AppCompose>
</template>

<script setup lang="ts">
// import './assets/scss/main.scss'
import { AppCompose } from './components'
import Playground from './components/Playground.vue'

import type { YTheme } from './types'

const theme: YTheme = {
  primary: '#e3c567',
  danger: '#E3514A',
  background: '#ABCDF8',
  dark: '#0b0c0c',
}
</script>
