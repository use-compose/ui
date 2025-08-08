import { useThemeComponentStory } from '@/composables'
import type { Meta, StoryObj } from '@storybook/vue3'
import YDateTimeInput from './YDateTimeInput.vue'
import type { YDateTimeInputProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YDateTimeInputProps>(YDateTimeInput)

const meta: Meta<typeof YDateTimeInput> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Form/Input/YDateTimeInput',
  component: YDateTimeInput,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {
    ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof meta>

const renderGenericStory: Story = {
  render: (args: YDateTimeInputProps, { argTypes }) => ({
    components: { YDateTimeInput },
    props: Object.keys(argTypes),
    template: `
      <YDateTimeInput v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
}

const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

export { Default, Disabled, Large, Outlined, Raw, Small }
