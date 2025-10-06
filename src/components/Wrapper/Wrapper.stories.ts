import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Wrapper from './Wrapper.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<WrapperProps>(Wrapper)

const meta: Meta<typeof Wrapper> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Wrapper',
  component: Wrapper,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
} satisfies Meta<typeof Wrapper>

export default meta
type Story = StoryObj<typeof Wrapper>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { Wrapper },
    props: Object.keys(argTypes),
    template: `
      <Wrapper v-bind="args" />
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
