import type { Meta, StoryObj } from '@storybook/vue3-vite'

const spacingScale = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const

const meta: Meta = {
  title: 'Primitives/Spacing',
  parameters: {
    docs: {
      description: {
        component:
          'The spacing scale (`--spacing-xxs` … `--spacing-xxl`) is a single ratio-derived ' +
          'sequence, not seven independent values — resizing `--_layout-space-unit` on the ' +
          'theme moves every step together. Layout components (`YStack`, `YRow`, `YBox`) ' +
          'take these as their `gap`/`padding`/`margin` props instead of raw rem values, so ' +
          'a theme change stays consistent across every component that used the scale.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div v-for="key in spacingScale" :key="key" style="display: flex; align-items: center; gap: 1rem;">
          <code style="width: 4rem;">{{ key }}</code>
          <div :style="{ height: '1rem', width: \`var(--spacing-\${key})\`, background: 'var(--color-primary, #6ea8fe)' }" />
          <code style="color: grey;">var(--spacing-{{ key }})</code>
        </div>
      </div>
    `,
    setup() {
      return { spacingScale }
    },
  }),
}
