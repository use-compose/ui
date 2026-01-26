import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { YBox } from '../YBox'
import { YInputText } from '../YInputText'
import YStack from './YStack.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YStackProps>(YStack)

const meta: Meta<typeof YStack> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YStack',
  component: YStack,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YStack>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YBox, YStack, YInputText },
    props: Object.keys(argTypes),
    template: `
      <YStack v-bind="args" border="width-medium primary solid" padding="sm" height="screen">
        <YInputText placeholder="First Input" />
        <YInputText placeholder="Second Input" />
        <YInputText placeholder="Third Input" />
      </YStack>
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
