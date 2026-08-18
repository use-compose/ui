import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YRegion from './YRegion.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YRegionProps>(YRegion)

const meta: Meta<typeof YRegion> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YRegion',
  component: YRegion,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
};
 
export default meta;
type Story = StoryObj<typeof YRegion>;

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YRegion },
    props: Object.keys(argTypes),
    template: `
      <YRegion v-bind="args" />
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
