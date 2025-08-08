import YCheckbox from '@/components/YCheckbox/YCheckbox.vue'
import { YHighlightedText } from '@/components/YHighlightedText'
import { YTag } from '@/components/YTag'
import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref } from 'vue'
import YTableDataCell from '../YTableDataCell/YTableDataCell.vue'
import YTableHeader from './YTableHeader.vue'

const meta: Meta<typeof YTableHeader> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data/YTableHeader',
  component: YTableHeader,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof YTableHeader>

const renderGenericStory: Story = {
  render: (args) => ({
    components: { YTableHeader, YTableDataCell },
    props: Object.keys(args),
    template: `
      <YTableHeader :headers="headers">
      </YTableHeader>
  `,
    setup() {
      const headers = [
        { key: 'name', value: 'Name', colspan: 4 },
        { key: 'age', value: 'Age', colspan: 1 },
        { key: 'email', value: 'Email', colspan: 1 },
      ]

      return { args, headers }
    },
  }),
}

const TableHeaderWithCustomSlots: Story = {
  ...renderGenericStory,
  render: (args) => ({
    components: { YTableHeader, YTableDataCell, YCheckbox, YHighlightedText, YTag },
    props: Object.keys(args),
    template: `
      <YTableHeader :headers="headers">
        <template v-for="(header, index) in headers" :key="index">
          <YTableDataCell v-if="header.key === 'checkbox'" header> 
            <YCheckbox v-model="check" />
          </YTableDataCell>
          <YTableDataCell v-else-if="header.key === 'highlight'" header>
            <YHighlightedText  class="ml-sm" level="h4" animate>{{ check ? 'This is a highlighted text' : 'Hover me' }}</YHighlightedText>
          </YTableDataCell>
          <YTableDataCell v-else-if="header.key === 'tag'" header>
            <YTag>{{ header.value }}</YTag>
          </YTableDataCell>
        </template>
      </YTableHeader>
  `,
    setup() {
      const check = ref(false)
      const headers = computed(() => [
        {
          key: 'highlight',
          value: 'Hover me',
        },
        {
          key: 'tag',
          value: 'To Do',
        },
        {
          key: 'checkbox',
          value: false,
        },
      ])
      return { args, headers, check }
    },
  }),
}

export { renderGenericStory as Default, TableHeaderWithCustomSlots }
