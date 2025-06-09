import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3'
import YTag from './YTag.vue'
import type { YTagProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YTagProps>(YTag)

const meta: Meta<typeof YTag> = {
  // TODO: TO CHANGE PATH
  title: 'Compose/YTag',
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
