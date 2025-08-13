import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3-vite'
import YLabel from './YLabel.vue'
import type { YLabelProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YLabelProps>(YLabel)

const meta: Meta<typeof YLabel> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Form/YLabel',
  component: YLabel,
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
