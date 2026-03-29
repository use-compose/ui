import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YParallax from './YParallax.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YParallaxProps>(YParallax)

const meta: Meta<typeof YParallax> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YParallax',
  component: YParallax,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
};
 
export default meta;
type Story = StoryObj<typeof YParallax>;

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YParallax },
    props: Object.keys(argTypes),
    template: `
      <YParallax v-bind="args" />
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
