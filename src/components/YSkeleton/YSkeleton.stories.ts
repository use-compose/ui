import type { Meta , StoryObj} from '@storybook/vue3';
import YSkeleton from './YSkeleton.vue';
import type { YSkeletonProps } from './types';
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
};
 
export default meta;
type Story = StoryObj<typeof YSkeleton>;

const renderGenericStory: Story = {
  render: (args: YSkeletonProps) => ({
    components: { YSkeleton },
    props: Object.keys(args),
    template: `
      <YSkeleton v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
