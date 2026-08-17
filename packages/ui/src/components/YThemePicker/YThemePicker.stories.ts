import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AppCompose } from '../AppCompose'
import { Card } from '../Card'
import { YButton } from '../YButton'
import YThemePicker from './YThemePicker.vue'

const meta: Meta<typeof YThemePicker> = {
  title: 'Components/Core/YThemePicker',
  component: YThemePicker,
  tags: ['autodocs'],
  argTypes: {
    showColors: {
      control: 'boolean',
      description: 'Show the theme colour inputs.',
    },
    showTokens: {
      control: 'boolean',
      description: 'Show the design-token knobs (border, spacing, radius, font scale roots).',
    },
  },
}

export default meta
type Story = StoryObj<typeof YThemePicker>

// `useTheme()` is a standalone singleton now — it doesn't require an `AppCompose`
// wrapper. It's used here anyway for `use-bg`, so the live preview below picks up
// the background token as it changes.
const render: Story['render'] = (args) => ({
  components: { AppCompose, YThemePicker, Card, YButton },
  setup() {
    return { args }
  },
  template: `
    <AppCompose use-bg style="padding: 1.5rem">
      <YThemePicker v-bind="args" />
      <hr style="margin: 1.5rem 0" />
      <Card title="Live preview">
        <p>Border, radius, spacing and font tokens below react to the knobs above.</p>
        <YButton>Primary</YButton>
        <YButton color="secondary">Secondary</YButton>
        <YButton color="danger">Danger</YButton>
      </Card>
    </AppCompose>
  `,
})

export const Default: Story = { render, args: { showColors: true, showTokens: true } }

export const ColorsOnly: Story = { render, args: { showColors: true, showTokens: false } }

export const TokensOnly: Story = { render, args: { showColors: false, showTokens: true } }
