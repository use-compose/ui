import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { boxArgTypes } from '../../YBox/YBox.stories'
import YCenter from './YCenter.vue'

const meta: Meta<typeof YCenter> = {
  title: 'Components/Layout/Cube/YCenter',
  component: YCenter,
  tags: ['autodocs'],
  argTypes: {
    ...boxArgTypes,
    measure: { control: 'text', description: 'Max-width cap on the centered content.' },
  },
  args: {
    measure: '34rem',
  },
}

export default meta
type Story = StoryObj<typeof YCenter>

export const Default: Story = {
  render: (args) => ({
    components: { YCenter },
    setup() {
      return { args }
    },
    template: `
      <YCenter v-bind="args" style="min-height: 12rem; outline: 1px dashed var(--color-bg-subtle);">
        <p>
          Centered on both axes, and capped at the measure so a long line of
          text stays readable even when its container is much wider.
        </p>
      </YCenter>
    `,
  }),
}

export const WideContainerNarrowMeasure: Story = {
  args: { measure: '16rem' },
  render: (args) => ({
    components: { YCenter },
    setup() {
      return { args }
    },
    template: `
      <YCenter v-bind="args" style="min-height: 10rem; width: 40rem; outline: 1px dashed var(--color-bg-subtle);">
        <p>The measure caps this well below the container's own width.</p>
      </YCenter>
    `,
  }),
}
