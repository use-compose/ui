<script setup lang="ts">
import { ref } from 'vue'
import { Wrapper } from '.'
import { YButton } from '.'
import { YInput } from '.'

defineProps<{ msg: string }>()

const count = ref(0)
const input = ref('')
const showMsg = ref(false)

const toggleDisplayMsg = () => {
  showMsg.value = !showMsg.value
}
</script>

<template>
  <div>
    <Wrapper class="hello">
      <h1>{{ msg }}</h1>

      <div class="card">
        <button type="button" @click="count++">count is {{ count }}</button>
        <p>
          Edit
          <code>components/HelloWorld.vue</code> to test HMR
        </p>
      </div>

      <YButton @click="toggleDisplayMsg">Button</YButton>

      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" raw placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />

      <h5 v-show="showMsg">{{ input }}</h5>

      <p>
        Check out
        <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the
        official Vue + Vite starter
      </p>
      <p>
        Install
        <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
        in your IDE for a better DX
      </p>
      <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    </Wrapper>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
.hello {
  /* background-color: var(--primary-60); */
}
</style>
