import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { boxArgTypes } from '../YBox/YBox.stories'
import YButton from '../YButton/YButton.vue'
import YFlow from './YFlow.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YFlowProps>(YFlow)

const meta: Meta<typeof YFlow> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YFlow',
  component: YFlow,
  tags: ['autodocs'],
  argTypes: {
    ...boxArgTypes,
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YFlow>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YFlow, YButton },
    props: Object.keys(argTypes),
    template: `
      <YFlow v-bind="args">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <YButton>Click Me</YButton>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </YFlow>
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
