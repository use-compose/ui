<template>
  <AppCompose :theme="theme" :use-bg="true">
    <!-- <ModalProvider> -->
    <YEditor />
    <!-- </ModalProvider> -->
  </AppCompose>
</template>

<script setup lang="ts">
// import './assets/scss/main.scss'
// import './assets/scss/global.scss'
// import './assets/css/global.css'
import type { YTheme } from '@use-compose/ui'
import { AppCompose } from '@use-compose/ui'
import YEditor from './YEditor/YEditor.vue'

const theme: YTheme = {
  primary: '#e3c567',
  danger: '#E3514A',
  background: '#ABCDF8',
  dark: '#0b0c0c',
}
</script>
