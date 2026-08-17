<template>
  <YContainer>
    <YFlow class="flow-playground">
      <YHeader title="YCompose" title-link="/" />

      <YSection title="Theme">
        <YFlow>
          <YHighlightedText as="h2" animate active>Theme Picker</YHighlightedText>
          <YThemePicker />
        </YFlow>
      </YSection>

      <YSection title="Switcher">
        <YRow type="switcher">
          <YBox
            v-for="column in columns"
            :key="column.bg"
            padding="md"
            :background-color="column.bg"
          >
            <p>{{ column.text }}</p>
          </YBox>
        </YRow>
      </YSection>

      <YSection title="Cards">
        <YRow type="cluster">
          <YCard>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis
            quaerat non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto
            quia.
          </YCard>
          <YCard>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quos esse blanditiis
            quaerat non sed, pariatur dolores aspernatur alias nesciunt nemo recusandae architecto
            quia.
          </YCard>
        </YRow>
      </YSection>

      <YSection title="Timeline">
        <YFlow>
          <YTimeline>
            <YTimelineItem
              v-for="step in steps"
              :key="step.title"
              :tag="step.tag"
              :title="step.title"
              :description="step.description"
              :highlighted="step.highlighted"
            />
          </YTimeline>

          <YHighlightedText as="h3">Collapsible</YHighlightedText>
          <YTimeline collapsible>
            <YTimelineItem
              v-for="step in steps"
              :key="step.title"
              :tag="step.tag"
              :title="step.title"
              :description="step.description"
            />
          </YTimeline>
        </YFlow>
      </YSection>

      <YSection title="Inputs">
        <YFlow>
          <YInput v-model="input" data-compose-ui="block" label="Message" placeholder="Message" />
          <YInput
            v-model="input"
            data-compose-ui="block"
            size="large"
            label="Large"
            placeholder="Message"
          />
          <YInput v-model="input" data-compose-ui="block" raw label="Raw" placeholder="Message" />
          <YInput
            v-model="input"
            data-compose-ui="block"
            focus
            size="small"
            label="Small"
            placeholder="Message"
          />
          <YInput
            v-model="input"
            data-compose-ui="block"
            error
            error-msg="ERROR"
            label="Error"
            placeholder="Message"
          />
          <YInput
            v-model="input"
            data-compose-ui="block"
            variant="outlined"
            raw
            label="Outlined"
            placeholder="Message"
          />
          <YDateInput v-model="date" raw label="Date Input" placeholder="Select a date" />
          <YTimeInput v-model="time" raw label="Time Input" placeholder="Select a time" />
          <YDateTimeInput v-model="datetime" raw label="Date & time" />
          <YColorInput v-model="color" label="Color" />
          <YCheckbox v-model="checked" raw label="Checkbox" />
        </YFlow>
      </YSection>

      <YSection title="Buttons">
        <YRow type="cluster">
          <YButton @click="openDrawer">Open Drawer</YButton>
          <YButton raw variant="outlined" @click="toggleDisplayMsg">Toggle message</YButton>
          <YButton @click="showComplexModal = true">Open Complex Modal</YButton>
        </YRow>
        <h5 v-show="showMsg">{{ input }}</h5>
      </YSection>

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

      <YSection title="Cube Layout">
        <YFlow>
          <YHighlightedText as="h3">YCenter</YHighlightedText>
          <YCenter style="min-height: 10rem; outline: 1px dashed var(--color-bg-subtle)">
            <p>Centered on both axes, capped at a readable measure.</p>
          </YCenter>

          <YHighlightedText as="h3">YScroll</YHighlightedText>
          <YScroll>
            <div
              v-for="n in 6"
              :key="n"
              style="
                width: 10rem;
                background: var(--color-bg-elevated);
                border-radius: 0.5rem;
                padding: 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              Card {{ n }}
            </div>
          </YScroll>

          <YHighlightedText as="h3">YScreen</YHighlightedText>
          <YScreen min-height="20rem" style="outline: 1px dashed var(--color-bg-subtle)">
            <header><h4>Header</h4></header>
            <p>Content centered between header and footer.</p>
            <footer>Footer</footer>
          </YScreen>
        </YFlow>
      </YSection>

      <YSection title="State">
        <YFlow>
          <pre>input: {{ input }}</pre>
          <pre>checked: {{ checked }}</pre>
          <pre>color: {{ color }}</pre>
          <pre>date: {{ date }}</pre>
          <pre>time: {{ time }}</pre>
          <pre>datetime: {{ datetime }}</pre>
        </YFlow>
      </YSection>

      <YModal
        v-model="showComplexModal"
        :has-footer="true"
        header="Custom header"
        @action="console.log('Action!')"
        @cancel="console.log('Cancel!')"
        @left-action="console.log('Left Action!')"
      >
        <p v-for="n in 6" :key="n">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus ut quidem vero debitis
          eligendi corporis! Sint exercitationem ipsam temporibus earum obcaecati, omnis, numquam
          minima ducimus sit itaque, minus optio nemo?
        </p>
      </YModal>

      <YModal
        v-model="showDrawer"
        :type="YModalType.Drawer"
        :size="YModalSize.Medium"
        :has-footer="true"
      >
        <template #header>
          <h1>Form Drawer</h1>
        </template>
      </YModal>
    </YFlow>
  </YContainer>
</template>

<script setup lang="ts">
import {
  YBox,
  YButton,
  YCard,
  YCenter,
  YCheckbox,
  YColorInput,
  YDateInput,
  YDateTimeInput,
  YDropdown,
  YInput,
  YModal,
  YRow,
  YScreen,
  YScroll,
  YTimeInput,
  YTimeline,
  YTimelineItem,
} from '@/components'
import { ref } from 'vue'
import YContainer from './YContainer/YContainer.vue'
import YFlex from './YFlex/YFlex.vue'
import { YHeader } from './YHeader'
import YHighlightedText from './YHighlightedText/YHighlightedText.vue'
import { YModalSize, YModalType } from './YModal/types'
import YSection from './YSection/YSection.vue'
import { YThemePicker } from './YThemePicker'
import YFlow from './cube/YFlow/YFlow.vue'

const lorem =
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. At molestiae atque voluptatum adipisci maxime ipsum quae laudantium quibusdam iure ipsa debitis reprehenderit ratione autem nesciunt repellendus enim, voluptatibus velit.'

const columns = [
  { bg: 'subtle', text: lorem },
  { bg: 'elevated', text: lorem },
  { bg: 'inset', text: lorem },
]

const steps = [
  {
    tag: 'Step 1',
    title: 'Pick the components',
    description: 'Choose the primitives to build on.',
  },
  {
    tag: 'Step 2',
    title: 'Compose the layout',
    description: 'Stack them with the cube layouts.',
    highlighted: true,
  },
  { tag: 'Step 3', title: 'Ship it', description: 'The last item closes the rail.' },
]

const input = ref('')
const checked = ref(false)
const color = ref('#e3c567')
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

function openDrawer() {
  showDrawer.value = true
}
</script>

<style>
@layer components {
  /* The private `--_flow-space` is what YFlow.css reads, and its public
     source resolves to a length on `:root` — so children inherit an
     already-substituted value and overriding `--flow-space`/`--gutter` here
     would never reach it. */
  .y-flow.flow-playground {
    --_flow-space: 3rem;
  }

  .flow-playground .y-section .y-flow {
    --_flow-space: 1.5rem;
  }
}
</style>
