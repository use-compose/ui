import type { Meta, StoryObj } from '@storybook/vue3'
import YSkeleton from './YSkeleton.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YSkeletonProps>(YSkeleton)

const meta: Meta<typeof YSkeleton> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YSkeleton',
  component: YSkeleton,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YSkeleton>

const renderGenericStory: Story = {
  render: () => ({
    components: { YSkeleton },
    template: `
      <YSkeleton  />
  `,
    setup() {
      return {}
    },
  }),
}

export { renderGenericStory as Default }
