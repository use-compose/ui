import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { YModalSize, YModalType, type BaseModalProps } from './types/YBaseModal.interface'
import YBaseModal from './YBaseModal.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YBaseModal)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YBaseModal> = {
  title: 'Components/Overlay/YBaseModal',
  component: YBaseModal,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hasCloseButton: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    header: { control: 'text' },
    mainSlot: { control: 'text' },
    hasFooter: { control: 'boolean' },
    size: { control: 'text' },
    type: { control: 'text' },
  },
  args: {
    hasCloseButton: false,
    hasHeader: false,
    hasFooter: false,
    size: YModalSize.Medium,
    type: YModalType.Default,
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
  },
}

const { Outlined, Raw } = generateCommonStories(Default)

export { Default, Outlined, Raw }
