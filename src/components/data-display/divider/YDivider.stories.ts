import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { action } from '@storybook/addon-actions'
import YDivider, { YDividerProps } from './YDivider.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YDivider)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YDivider> = {
  title: 'Compose/DataDisplay/Divider',
  component: YDivider,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    onClick: { action: 'handleClick' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {
    onClick: action('onClick'),
  }, // default value
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YDividerProps, { argTypes }) => ({
    components: { YDivider },
    props: Object.keys(argTypes),
    template: `
    <YButton v-bind="args">Label</YButton>
  `,
    setup() {
      return { args }
    },
  }),
  args: {},
}

const { Default, Outlined, Disabled, Raw, Large, Small } = generateCommonStories(renderGenericStory)

export { Default, Disabled, Large, Outlined, Raw, Small }
