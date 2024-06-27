import type { Meta, StoryObj } from '@storybook/vue3'

import YInput from './YInput.vue'

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
  title: 'Compose/Form/YInput',
  component: YInput,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    small: { control: 'boolean' },
    big: { control: 'boolean' },
    // backgroundColor: { control: "color" },
    // onClick: { action: "handleClick"},
  },
  args: {}, // default value
} satisfies Meta<typeof YInput>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  args: {
    modelValue: 'Default',
  },
}

export const Small: Story = {
  args: {
    modelValue: 'Small',
    small: true,
  },
}

export const Big: Story = {
  args: {
    modelValue: 'Big',
    big: true,
  },
}

export const Hero: Story = {
  args: {
    modelValue: 'Hero',
    hero: true,
  },
}
