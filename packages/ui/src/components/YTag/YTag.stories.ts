import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import type { YTagProps } from './YTag.types'
import YTag from './YTag.vue'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YTagProps>(YTag)

const meta: Meta<typeof YTag> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Data Display/YTag',
  component: YTag,
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
