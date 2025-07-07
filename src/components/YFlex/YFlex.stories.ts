import { useThemeComponentStory } from '@/composables'
import type { ArgTypes, Meta } from '@storybook/vue3'
import YFlex from './YFlex.vue'
import type { YFlexProps } from './types'

const { generateCommonStories } = useThemeComponentStory<YFlexProps>(YFlex)

const meta: Meta<typeof YFlex> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YFlex',
  component: YFlex,
  tags: ['autodocs'],
}

export default meta
// type Story = StoryObj<typeof YFlex>;

const renderGenericStory = {
  render: (args: YFlexProps, argTypes: ArgTypes) => ({
    components: { YFlex },
    props: Object.keys(argTypes),
    template: `
    <YFlex v-bind="args">
      <div class="bg-primary text-white p-4">Item 1</div>
      <div class="bg-secondary text-white p-4">Item 2</div>
      <div class="bg-tertiary text-white p-4">Item 3</div>
    </YFlex>
  `,
    setup() {
      return {
        args,
      }
    },
  }),
}

const { Primary } = generateCommonStories(renderGenericStory)

export { Primary }
