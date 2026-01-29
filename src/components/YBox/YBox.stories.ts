import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import YBox from './YBox.vue'

export const boxArgTypes: ArgTypes = {
  padding: { control: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] },
  radius: { control: 'select', options: ['none', 'light', 'medium', 'heavy', 'full'] },
  width: { control: 'select', options: ['auto', 'full', 'half', 'screen'] },
  height: { control: 'select', options: ['auto', 'full', 'half', 'screen'] },
  border: {
    control: 'inline-check',
    options: [
      'width-small',
      'primary',
      'solid',
      'width-medium',
      'secondary',
      'dashed',
      'width-large',
      'neutral',
      'dotted',
      'accent',
      'background',
      'danger',
      'info',
      'success',
    ],
  },
  backgroundColor: {
    control: 'select',
    options: [
      'primary',
      'secondary',
      'accent',
      'neutral',
      'accent-subtle',
      'page',
      'subtle',
      'elevated',
      'inset',
      'info',
      'success',
    ],
  },
}

const meta: Meta<typeof YBox> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YBox',
  component: YBox,
  tags: ['autodocs'],
  argTypes: {
    ...boxArgTypes,
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
