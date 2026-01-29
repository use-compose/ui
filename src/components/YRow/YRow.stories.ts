import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { boxArgTypes } from '../YBox/YBox.stories'
import YRow from './YRow.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YRowProps>(YRow)

const meta: Meta<typeof YRow> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YRow',
  component: YRow,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'cluster', 'switcher'] },
    ...boxArgTypes,
  },
  args: {
    type: 'default',
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YRow>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YRow },
    props: Object.keys(argTypes),
    template: `
      <YRow v-bind="args">
        <div style="background-color: lightgray; padding: 1rem;">Column 1</div>
        <div style="background-color: gray; padding: 1rem;">Column 2</div>
        <div style="background-color: darkgray; padding: 1rem;">Column 3</div>
        <div style="background-color: dimgray; padding: 1rem;">Column 4</div>
        <div style="background-color: silver; padding: 1rem;">Column 5</div>
      </YRow>
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
