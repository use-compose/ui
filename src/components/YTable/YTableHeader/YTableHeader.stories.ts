import type { Meta, StoryObj } from '@storybook/vue3'
import YTableDataCell from '../YTableDataCell/YTableDataCell.vue'
import YTableHeader from './YTableHeader.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YTableHeaderProps>(YTableHeader)

const meta: Meta<typeof YTableHeader> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data/YTableHeader',
  component: YTableHeader,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YTableHeader>

const renderGenericStory: Story = {
  render: (args) => ({
    components: { YTableHeader, YTableDataCell },
    props: Object.keys(args),
    template: `
      <YTableHeader>
        <template #default>
          <YTableDataCell v-for="header in headers" :key="header.key" :colspan="header.colspan" class="header-item">
            {{ header.value }}
          </YTableDataCell>
        </template>
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

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
