<template>
  <Wrapper class="hello">
    <!-- <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
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
    <VerticalTitle>Title</VerticalTitle>
    <Container>
      <Flex style="--row">
        
        <YCard :cover="'@/assets/cheval.png'">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis
          quaerat non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto
          quia. In, enim ut. Debitis, beatae similique!
        </YCard>
        <YCard>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis
          quaerat non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto
          quia. In, enim ut. Debitis, beatae similique!
        </YCard>
      </Flex>

      <YInput v-model="input" label="Message" placeholder="Message" />
      <YInput v-model="input" size="large" label="Message" placeholder="Message" />
      <YInput v-model="input" label="Message" raw placeholder="Message" />
      <YInput v-model="input" focus size="small" label="Message" placeholder="Message" />
    </Container>

    <YInput v-model="input" error error-msg="ERROR" label="Message" placeholder="Message" />
    <YInput v-model="input" label="Message" placeholder="Message" />
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
    <YButtonOverview />
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
    <Flex>
      <YButton @click="openDrawer">Open Drawer</YButton>
    </Flex>

!-->
    <YButton @click="toggleDisplayMsg">Button</YButton>
    <h5 v-show="showMsg">{{ input }}</h5>

    <YButton @click="showComplexModal = true">Open Complex Modal</YButton>

    <YModal
      v-model="showComplexModal"
      :has-footer="true"
      header="Custom header"
      has
      @action="console.log('Action!')"
      @cancel="console.log('Cancel!')"
      @left-action="console.log('Left Action!')"
    >
      <!--  Complex Form as Main Slot -->
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
        eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
        minima ducimus sit itaque, minus optio nemo?
      </p>
    </YModal>

    <!-- <YColorInput v-model="color" label="Color" /> -->

    <YModal
      v-model="showDrawer"
      :type="YModalType.Drawer"
      :size="YModalSize.Medium"
      :has-footer="true"
    >
      <template #header>
        <h1>Form Drawer</h1>
      </template>

      <!-- Complex Form as Main Slot -->
    </YModal>
    <YInputText v-model="input" label="Message" placeholder="Message" />
    <YCheckbox v-model="checked" label="Checkbox" />
    <YButton variant="outlined" @click="openDrawer">openCustomModal</YButton>
    <YCard>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis quaerat
      non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto quia. In, enim
      ut. Debitis, beatae similique!
    </YCard>
    <YColorInput v-model="color" label="Color" />
  </Wrapper>
</template>

<script setup lang="ts">
import { Wrapper, YButton, YCard, YCheckbox, YColorInput, YInputText, YModal } from '@/components'
import { ref } from 'vue'
import { YModalSize, YModalType } from './YModal/types'

// const { theme } = useTheme()

const input = ref('')
const checked = ref(false)
const color = ref('#e3c567')
// const color = ref('')
const showMsg = ref(false)

const showComplexModal = ref(false)

const showDrawer = ref(false)

const toggleDisplayMsg = () => {
  showMsg.value = !showMsg.value
}

// const { show } = useModal()

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

// function openCustomModal() {
//   show({
//     content: 'test',
//     props: {
//       size: YModalSize.Large,
//       hasHeader: true,
//       // size: 'medium',
//       header: 'Custom xw<xw<dx<Heqsdqsdqdsader',
//     },
//   })
// }

function openDrawer() {
  showDrawer.value = true
}
</script>
<style>
/* body {
  --color-primary: #e3c567;
  --color-main-dark: #616970;
  --color-bg: #f8f9fa;
  --color-danger: #e3514a;
} */
</style>
