import type { Meta, StoryObj } from '@storybook/vue3'
import YTableDataCell from './YTableDataCell.vue'
import type { YTableDataCellProps } from './types'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YTableDataCellProps>(YTableDataCell)

const meta: Meta<typeof YTableDataCell> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data/YTableDataCell',
  component: YTableDataCell,
  tags: ['autodocs'],
  argTypes: {
    header: { control: { type: 'boolean' } },
    colspan: {
      control: 'text',
    },
    rowspan: {
      control: 'number',
      description: 'Number of rows the cell should span',
      defaultValue: 1,
    },
  },
  args: {
    header: false,
    colspan: 1,
    rowspan: 1,
    // ...commonArgs, // Uncomment if using common args from useThemeComponentStory
  },
}

export default meta
type Story = StoryObj<typeof YTableDataCell>

const renderGenericStory: Story = {
  render: (args: YTableDataCellProps, { argTypes }) => ({
    components: { YTableDataCell },
    props: Object.keys(argTypes),
    setup(props: YTableDataCellProps) {
      return { args: props }
    },
    template: `
      <YTableDataCell :header="args.header" :colspan="args.colspan" :rowspan="args.rowspan">
        <p>{{ args.header ? 'Header Cell' : 'Data Cell' }}</p>
      </YTableDataCell>
  `,
  }),
}

const HeaderDataCell: Story = {
  ...renderGenericStory,
  args: {
    header: true,
  },
}

export { renderGenericStory as Default, HeaderDataCell }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
