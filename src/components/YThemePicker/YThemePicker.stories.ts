import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import YThemePicker from './YThemePicker.vue'
import type { YThemePickerProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YThemePickerProps>(YThemePicker)

const meta: Meta<typeof YThemePicker> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YThemePicker',
  component: YThemePicker,
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
