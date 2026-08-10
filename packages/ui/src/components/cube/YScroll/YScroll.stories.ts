import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { boxArgTypes } from '../../YBox/YBox.stories'
import YScroll from './YScroll.vue'

const meta: Meta<typeof YScroll> = {
  title: 'Components/Layout/Cube/YScroll',
  component: YScroll,
  tags: ['autodocs'],
  argTypes: {
    ...boxArgTypes,
    blockSize: { control: 'text', description: 'Height of the scroll track.' },
  },
}

export default meta
type Story = StoryObj<typeof YScroll>

export const Default: Story = {
  render: (args) => ({
    components: { YScroll },
    setup() {
      return { args, cards: Array.from({ length: 8 }, (_, i) => i + 1) }
    },
    template: `
      <YScroll v-bind="args">
        <div
          v-for="n in cards"
          :key="n"
          style="width: 12rem; background: var(--color-bg-elevated); border-radius: 0.5rem; padding: 1rem; display: flex; align-items: center; justify-content: center;"
        >
          Card {{ n }}
        </div>
      </YScroll>
    `,
  }),
}
