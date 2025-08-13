import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import YDateInput from './YDateInput.vue'
import type { YDateInputProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YDateInputProps>(YDateInput)

const meta: Meta<typeof YDateInput> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Form/Input/YDateInput',
  component: YDateInput,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {
    ...commonArgs,
  },
}

export default meta

const { Default } = generateCommonStories()

export { Default }
