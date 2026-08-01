import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YList from './YList.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YListProps>(YList)

const meta: Meta<typeof YList> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YList',
  component: YList,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    highlighted: { control: 'boolean' },
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YList>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YList },
    props: Object.keys(argTypes),
    template: `
      <YList v-for="(item, index) in list" v-bind="args" :index="index" :lastIndex="index === list.length - 1">
        <template #default>
          <p v-f>This is a default slot content for YList. You can customize it as needed.</p>
        </template>
      </YList>
  `,
    setup() {
      const list = [
        {
          tag: 'Step 1',
          title: 'This is a title',
          description: 'This is a description for the list item.',
          highlighted: false,
        },
        {
          tag: 'Step 2',
          title: 'This is another title',
          description: 'This is another description for the list item.',
          highlighted: true,
        },
      ]

      const index = 0
      const lastIndex = index === list.length - 1
      return { args, index, lastIndex, list }
    },
  }),
  args: {
    tag: 'Step 1',
    title: 'This is a title',
    description: 'This is a description for the list item.',
    highlighted: false,
    index: 0,
    lastIndex: false,
  },
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
