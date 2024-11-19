import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { action } from '@storybook/addon-actions'
import type { BaseModalProps } from './types/YBaseModal.interface'
import YBaseModal from './YBaseModal.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YBaseModal)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YBaseModal> = {
  title: 'Compose/data-display/YBaseModal',
  component: YBaseModal,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hasCloseButton: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    header: { control: 'text' },
    hasMainSlot: { control: 'boolean' },
    mainSlot: { control: 'text' },
    hasFooter: { control: 'boolean' },
    hasButtonGroupRight: { control: 'boolean' },
    hasButtonGroupLeft: { control: 'boolean' },
    hasAction: { control: 'boolean' },
    action: { action: 'handleClick' },
    size: { control: 'text' },
    type: { control: 'text' },
  },
  args: {
    hasCloseButton: false,
    hasHeader: false,
    hasMainSlot: false,
    hasFooter: false,
    hasButtonGroupRight: false,
    hasButtonGroupLeft: false,
    hasAction: false,
    action: action('onClick'),
    size: 'medium',
    type: 'default',
  },
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: BaseModalProps, { argTypes }) => ({
    components: { YBaseModal },
    props: Object.keys(argTypes),
    template: `
    <YBaseModal v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
  args: {},
}

const Default: Story = {
  ...renderGenericStory,
  args: {
    hasHeader: true,
    header: 'Modal Component',
    size: 'medium',
  },
}

const { Outlined, Raw } = generateCommonStories(renderGenericStory)

export { Default, Outlined, Raw }
