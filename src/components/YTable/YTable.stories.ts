import type { Meta, StoryObj } from '@storybook/vue3'
import YTable from './YTable.vue'
import type { YTableProps } from './types'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YTableProps>(YTable)

const meta: Meta<typeof YTable> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data/YTable',
  component: YTable,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YTable>

const renderGenericStory: Story = {
  render: (args: YTableProps) => ({
    components: { YTable },
    props: Object.keys(args),
    template: `
      <YTable v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
  args: {
    headers: ['Header 1', 'Header 2', 'Header 3'],
    rows: [
      { 'Column 1': 'Row 1 Col 1', 'Column 2': 'Row 1 Col 2', 'Column 3': 'Row 1 Col 3' },
      { 'Column 1': 'Row 2 Col 1', 'Column 2': 'Row 2 Col 2', 'Column 3': 'Row 2 Col 3' },
      { 'Column 1': 'Row 3 Col 1', 'Column 2': 'Row 3 Col 2', 'Column 3': 'Row 3 Col 3' },
    ],
  },
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
