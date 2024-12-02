<script setup lang="ts">
// import './assets/scss/main.scss'
import { AppCompose, HelloWorld, ModalProvider } from './components'
</script>

<template>
  <AppCompose>
    <ModalProvider>
      <HelloWorld msg="App" />
    </ModalProvider>
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
