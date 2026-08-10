import { AppCompose, YButton } from '@use-compose/ui'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const colors = ['primary', 'secondary', 'danger'] as const
const variants = ['contained', 'outlined', 'text'] as const

const meta: Meta = {
  title: 'Primitives/Color',
  parameters: {
    docs: {
      description: {
        component:
          'Color is a `tone` (primary/secondary/danger) composed with a `variant` ' +
          '(contained/outlined/text) — the engine mixes OKLCH channels from both rather than ' +
          'each combination being a separately-authored color. Set `tone`/`variant`/`state` ' +
          'and the background, border and text colors derive automatically; `raw` opts a ' +
          "component out of the brutalist depth (shadow + transform) that's layered on top " +
          'for interactive states, without losing the tone colors.',
      },
    },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { AppCompose, YButton },
    template: `
      <AppCompose>
        <div v-for="variant in variants" :key="variant" style="margin-bottom: 1rem;">
          <small style="display: block; color: grey; margin-bottom: 0.5rem;">{{ variant }}</small>
          <div style="display: flex; gap: 1rem;">
            <YButton v-for="color in colors" :key="color" :color="color" :variant="variant">
              {{ color }}
            </YButton>
          </div>
        </div>
      </AppCompose>
    `,
    setup() {
      return { colors, variants }
    },
  }),
}
