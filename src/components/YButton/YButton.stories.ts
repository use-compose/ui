import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import YButton from './YButton.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YButton)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YButton> = {
  title: 'Components/Form/YButton',
  component: YButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    onClick: { action: 'handleClick' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {
    // onClick: action('onClick'),
  }, // default value
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (_, { argTypes }) => ({
    components: { YButton },
    props: Object.keys(argTypes),
    template: `
    <YButton v-bind="$props">Label</YButton>
  `,
  }),
  args: {
    size: 'medium',
    color: 'primary',
    variant: 'contained',
    state: 'base',
    raw: false,
  },
}

const { Default, Outlined, Disabled, Raw, Large, Small } = generateCommonStories(renderGenericStory)

export { Default, Disabled, Large, Outlined, Raw, Small }
