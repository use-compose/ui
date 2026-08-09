import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YWrapper from './YWrapper.vue'

const meta: Meta<typeof YWrapper> = {
  title: 'Components/Layout/Cube/YWrapper',
  component: YWrapper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof YWrapper>

export const Default: Story = {
  render: () => ({
    components: { YWrapper },
    template: `
      <div style="background: repeating-linear-gradient(90deg, var(--color-bg-subtle) 0 1px, transparent 1px 40px); width: 100%;">
        <YWrapper>
          <p style="background: var(--color-bg-elevated); padding: 1rem;">
            Constrained to a readable max-width and centered, with side
            padding that never touches the viewport edge.
          </p>
        </YWrapper>
      </div>
    `,
  }),
}
