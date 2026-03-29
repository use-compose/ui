import { Meta, StoryObj } from '@storybook/vue3-vite'

import Playground from './Playground.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'Overviews/Playground',
  component: Playground,
  args: {
    // Add any default args here if needed
    // For example:
    // onClick: () => console.log('Playground clicked'),
  },
  argTypes: {
    // Add any specific argTypes for Playground component here
    // For example:
    // backgroundColor: { control: 'color' },
    // onClick: { action: 'handleClick' },
  },
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Playground>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { Playground },
    props: Object.keys(argTypes),
    template: `
    <Playground v-bind="args" />
  `,
    setup() {
      return {
        args,
      }
    },
  }),
  args: {
    // Add any default args here if needed
  },
}

export const Default: Story = {
  ...renderGenericStory,
}
