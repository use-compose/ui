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
      <YParallax v-bind="args" height="24rem">
        <template #back>
          <div style="background: linear-gradient(180deg, #6ea8fe, #0d1b3e); width: 100%; height: 150%;" />
        </template>
        <div style="padding: 2rem; color: white;">
          <h2>Scroll me</h2>
          <p v-for="n in 20" :key="n">Content line {{ n }}</p>
        </div>
      </YParallax>
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
