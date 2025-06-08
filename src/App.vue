<script setup lang="ts">
// import './assets/scss/main.scss'
import { AppCompose, HelloWorld } from './components'
import { YHeader } from './components/YHeader'

import type { YTheme } from './types'

const theme: YTheme = {
  primary: '#e3c567',
  danger: '#E3514A',
  background: '#ABCDF8',
  dark: '#0b0c0c',
}
</script>

<template>
  <AppCompose :theme="theme">
    <YHeader title="YCompose" title-link="/" />
    <!-- <ModalProvider> -->
    <HelloWorld msg="App" />
    <!-- </ModalProvider> -->
  </AppCompose>
</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  2: filter;
  transition: filter 300ms;
} */

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
