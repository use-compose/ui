<template>
  <Wrapper class="hello">
    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
    <!-- <YColorInput v-model="color" label="Message" placeholder="Message" /> -->
    <Flex style="--flex-gap: 0">
      <Column style="--column-bg: blue; --width-tablet: 3; --width-mobile: 4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: green; --width-tablet: 4; --width-mobile: 8">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: red; --width-tablet: 5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
    </Flex>
    <Container>
      <YButton @click="toggleDisplayMsg">Button</YButton>
      <YCard>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis quaerat
        non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto quia. In,
        enim ut. Debitis, beatae similique!
      </YCard>
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" size="large" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" raw placeholder="Message" />
      <YInput v-model="input" focus size="small" label="Message" placeholder="Message" />
    </Container>

    <YInput v-model="input" error error-msg="ERROR" label="Message" placeholder="Message" />
    <YInput v-model="input" label="Message" placeholder="Message" />

    <h5 v-show="showMsg">{{ input }}</h5>
    <Flex style="--flex-gap: 0">
      <Column style="--column-bg: blue; --width-tablet: 3; --width-mobile: 4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: green; --width-tablet: 4; --width-mobile: 8">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: red; --width-tablet: 5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
    </Flex>
    <Flex style="--flex-gap: 0">
      <Column style="--column-bg: blue; --width-tablet: 3; --width-mobile: 4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: green; --width-tablet: 4; --width-mobile: 8">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: red; --width-tablet: 5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
    </Flex>
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
    <Flex style="--flex-gap: 0">
      <Column style="--column-bg: blue; --width-tablet: 3; --width-mobile: 4">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: green; --width-tablet: 4; --width-mobile: 8">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
      <Column style="--column-bg: red; --width-tablet: 5">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum
          adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione
          autem nesciunt repellendus enim, voluptatibus velit. Illum.
        </p>
      </Column>
    </Flex>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <YButton @click="toggleModal">Button</YButton>
    <YButton @click="openCustomModal">openCustomModal</YButton>
  </Wrapper>
</template>

<script setup lang="ts">
import {
  BaseComponent,
  Column,
  Container,
  Flex,
  Wrapper,
  YButton,
  YCard,
  // YColorInput,
  YInput,
} from '@/components'
import { useModal } from '@/composables'
import { ref } from 'vue'

const count = ref(0)
const input = ref('')
// const color = ref('')
const showMsg = ref(false)

const toggleDisplayMsg = () => {
  showMsg.value = !showMsg.value
}

const {
  show,
  close,
  modalState: { isVisible },
} = useModal()

// const newModelLol = show({
//   component: BaseComponent,
//   props: {
//     hasHeader: true,
//     size: 'large',
//   },
//   slots: {
//     header: 'Custom Header',
//   },
// })

function openCustomModal() {
  show({
    component: BaseComponent,
    props: {
      size: 'large',
      hasHeader: true,
      // size: 'medium',
      header: 'Custom Header',
    },
  })
}

const toggleModal = () => {
  if (isVisible) {
    close()
  } else {
    openCustomModal()
  }
}
</script>

<style scoped></style>
