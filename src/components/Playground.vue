<template>
  <YHeader title="YCompose" title-link="/" />

  <YThemePicker />
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

     <YInput data-compose-ui  v-model="input" label="Message" placeholder="Message" />
     <YInput data-compose-ui  v-model="input" size="large" label="Message" placeholder="Message" />
     <YInput data-compose-ui  v-model="input" label="Message" raw placeholder="Message" />
     <YInput data-compose-ui  v-model="input" focus size="small" label="Message" placeholder="Message" />
    </Container>

   <YInput data-compose-ui  v-model="input" error error-msg="ERROR" label="Message" placeholder="Message" />
   <YInput data-compose-ui  v-model="input" label="Message" placeholder="Message" />
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
  <YButton :raw="true" variant="outlined" @click="toggleDisplayMsg">Button</YButton>
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
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
      eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam minima
      ducimus sit itaque, minus optio nemo?
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
  <!--<YInput data-compose-ui  v-model="input" :raw="true" type="time" label="Message" placeholder="Message" /> -->
  <YInput
    v-model="input"
    data-compose-ui
    Text
    variant="outlined"
    :raw="true"
    label="Message"
    placeholder="Message"
  />
  <YCheckbox v-model="checked" :raw="true" label="Checkbox" />
  <YButton raw variant="outlined" @click="openDrawer">openCustomModal</YButton>
  <YCard>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis quaerat non
    sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto quia. In, enim ut.
    Debitis, beatae similique!
  </YCard>
  <YDateInput v-model="date" :raw="true" label="Date Input" placeholder="Select a date" />
  <YTimeInput v-model="time" :raw="true" label="Time Input" placeholder="Select a time" />
  <YDateTimeInput v-model="datetime" :raw="true" />
  <YColorInput v-model="color" :raw="true" label="Color" />
  <h4>Print variable</h4>
  <pre>{{ input }}</pre>
  <pre>{{ checked }}</pre>
  <pre>{{ color }}</pre>
  <pre>{{ showMsg }}</pre>
  <pre>{{ showComplexModal }}</pre>
  <pre>{{ showDrawer }}</pre>
  <pre>{{ $attrs }}</pre>
  <pre>{{ $props }}</pre>
  <hr />

  <YSection title="Dropdown">
    <YFlex>
      <YDropdown>
        <template #default="{ toggle, isOpen }">
          <YButton class="mb-0" @click="toggle">
            {{ isOpen ? 'Close Dropdown' : 'Open Dropdown' }}
          </YButton>
        </template>
        <template #dropdown>
          <ul class="dropdown-menu">
            <li><a href="#" class="dropdown-item">Item 1</a></li>
            <li><a href="#" class="dropdown-item">Item 2</a></li>
            <li><a href="#" class="dropdown-item">Item 3</a></li>
          </ul>
        </template>
      </YDropdown>
      <YDropdown>
        <template #default="{ toggle, isOpen }">
          <YButton class="mb-0" @click="toggle">
            {{ isOpen ? 'Close Nested Dropdown 1' : 'Open Nested Dropdown 1' }}
          </YButton>
        </template>
        <template #dropdown>
          <ul class="dropdown-menu">
            <YDropdown raw>
              <template #default="{ toggle, isOpen }">
                <YButton class="mb-0" :raw="false" @click="toggle">
                  {{ isOpen ? 'Close Nested Dropdown 2' : 'Open Nested Dropdown 2' }}
                </YButton>
              </template>
              <template #dropdown>
                <ul class="dropdown-menu">
                  <li><a href="#" class="dropdown-item">Item 1</a></li>
                  <li><a href="#" class="dropdown-item">Item 2</a></li>
                  <li><a href="#" class="dropdown-item">Item 3</a></li>
                </ul>
              </template>
            </YDropdown>
          </ul>
        </template>
      </YDropdown>
    </YFlex>
  </YSection>
</template>

<script setup lang="ts">
import {
  YButton,
  YCard,
  YCheckbox,
  YColorInput,
  YDateInput,
  YDateTimeInput,
  YDropdown,
  YModal,
  YTimeInput,
} from '@/components'
import { ref } from 'vue'
import YFlex from './YFlex/YFlex.vue'
import { YHeader } from './YHeader'
import { YModalSize, YModalType } from './YModal/types'
import YSection from './YSection/YSection.vue'
import { YThemePicker } from './YThemePicker'

const input = ref('')
const checked = ref(false)
const color = ref('#e3c567')
// const color = ref('')
const date = ref('')
const time = ref('')

const now = new Date()
const datetime = ref(now.toISOString())

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
