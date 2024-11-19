import type { Meta, StoryObj } from '@storybook/vue3'

import { useThemeComponentStory } from '@/composables'
import { action } from '@storybook/addon-actions'
import YOverlay, { YOverlayProps } from './YOverlay.vue'

const { commonArgTypes } = useThemeComponentStory(YOverlay)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YOverlay> = {
  title: 'Compose/feedback/YOverlay',
  component: YOverlay,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    onClick: { action: 'handleClick' },
    color: { control: 'color' },
    opacity: { control: 'number' },
    blur: { control: 'number' },
  },
  args: {
    onClick: action('onClick'),
  }, // default value
}

export default meta

type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YOverlayProps, { argTypes }) => ({
    components: { YOverlay },
    props: Object.keys(argTypes),
    template: `
    <YOverlay v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
  args: {},
}

const Default = renderGenericStory

export { Default }
