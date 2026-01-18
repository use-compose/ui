import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YBox from './YBox.vue'

const meta: Meta<typeof YBox> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YBox',
  component: YBox,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
    radius: { control: 'select', options: ['none', 'light', 'medium', 'heavy', 'full'] },
    width: { control: 'select', options: ['auto', 'full', 'half', 'screen'] },
    height: { control: 'select', options: ['auto', 'full', 'half', 'screen'] },
    border: {
      control: 'select',
      options: [
        'theme-10',
        'theme-25',
        'theme-50',
        'light',
        'medium',
        'heavy',
        'width-10',
        'width-25',
        'width-50',
      ],
    },
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YBox>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { YBox },
    props: Object.keys(argTypes),
    template: `
      <YBox v-bind="args" />
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
