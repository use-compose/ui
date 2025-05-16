import { useThemeComponentStory } from '@/composables'
import type { Meta } from '@storybook/vue3'
import YFlex from './YFlex.vue'
import type { YFlexProps } from './types'

const { generateCommonStories } = useThemeComponentStory<YFlexProps>(YFlex)

const meta: Meta<typeof YFlex> = {
  // TODO: TO CHANGE PATH
  title: 'Compose/YFlex',
  component: YFlex,
  tags: ['autodocs'],
}

export default meta
// type Story = StoryObj<typeof YFlex>;

const { Default } = generateCommonStories()

export { Default }
