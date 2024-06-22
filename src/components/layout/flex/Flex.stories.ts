import { Meta, StoryObj } from '@storybook/vue3'

import Flex from './Flex.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Compose/Flex',
  component: Flex,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof Flex>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    // maxWidth: '1100',
  },
}
