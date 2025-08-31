import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import type { YTimeInputProps } from './YTimeInput.types'
import YTimeInput from './YTimeInput.vue'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YTimeInputProps>(YTimeInput)

const meta: Meta<typeof YTimeInput> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Form/Input/YTimeInput',
  component: YTimeInput,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {
    ...commonArgs,
  },
}

export default meta
// type Story = StoryObj<typeof meta>;

const { Default } = generateCommonStories()

export { Default }
