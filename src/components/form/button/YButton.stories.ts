import type { Meta, StoryObj } from '@storybook/vue3'

import YButton from './YButton.vue'
import { action } from '@storybook/addon-actions'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Compose/YButton',
  component: YButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    default: {
      control: 'text',
      description: 'Slot content',
      defaultValue: 'Badge',
    },
    onClick: { action: 'handleClick' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {}, // default value
} satisfies Meta<typeof YButton>

export default meta
type Story = StoryObj<typeof meta>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
const template = '<YButton @click="handleClick" v-bind="args">YButton</YButton>'

// Define a generic render function
const renderTemplate = (args) => ({
  components: { YButton },
  setup() {
    // Define the handleClick method here
    const handleClick = () => {
      action('handleClick')()
      // Your actual handleClick logic if any
    }

    return {
      args,
      handleClick,
    }
  },
  template,
})

export const Primary: Story = {
  render: (args) => renderTemplate(args),
  args: {
    color: 'primary',
  },
}

export const Disabled: Story = {
  render: (args) => renderTemplate(args),
  args: {
    disabled: true,
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}
