import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { boxArgTypes } from '../../YBox/YBox.stories'
import YScreen from './YScreen.vue'

const meta: Meta<typeof YScreen> = {
  title: 'Components/Layout/Cube/YScreen',
  component: YScreen,
  tags: ['autodocs'],
  argTypes: {
    ...boxArgTypes,
    minHeight: {
      control: 'text',
      description:
        'Min-height of the screen. `100svh` (default) fills the viewport, `100%` fills the parent instead.',
    },
  },
  args: {
    minHeight: '60vh',
  },
}

export default meta
type Story = StoryObj<typeof YScreen>

export const Default: Story = {
  render: (args) => ({
    components: { YScreen },
    setup() {
      return { args }
    },
    template: `
      <YScreen v-bind="args" style="outline: 1px dashed var(--color-bg-subtle);">
        <header><h2>Header</h2></header>
        <p>
          Main content is centered vertically between the header and footer,
          both of which stay pinned to the edges.
        </p>
        <footer>Footer</footer>
      </YScreen>
    `,
  }),
}

export const FillsViewport: Story = {
  args: { minHeight: '100svh' },
  render: (args) => ({
    components: { YScreen },
    setup() {
      return { args }
    },
    template: `
      <YScreen v-bind="args">
        <header><h2>Hero header</h2></header>
        <p>Fills the full viewport height — the "Banner" use case.</p>
      </YScreen>
    `,
  }),
}
