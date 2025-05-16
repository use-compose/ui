import YButton from '@/components/form/YButton/YButton.vue'
import { useThemeComponentStory } from '@/composables'
import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3'
import YButtonOverview from './YButtonOverview.vue'
import type { YButtonOverviewProps } from './types'

const { commonArgTypes, commonArgs, generateCommonStories } =
  useThemeComponentStory<YButtonOverviewProps>(YButtonOverview)

const meta: Meta<typeof YButtonOverview> = {
  // TODO: TO CHANGE PATH
  title: 'Compose/YButtonOverview',
  component: YButtonOverview,
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
  render: (_, { argTypes }: ArgTypes) => ({
    components: { YButtonOverview, YButton },
    props: Object.keys(argTypes),
    template: `
      <YButtonOverview v-bind="$props" />
    `,
    // context: { args },
  }),
}

const { Default } = generateCommonStories(renderGenericStory)

export { Default }
