import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { COMPOSE_BG_TOKENS } from './AppCompose.types'
import AppCompose from './AppCompose.vue'

const meta: Meta<typeof AppCompose> = {
  title: 'Components/Core/AppCompose',
  component: AppCompose,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'object',
      description: 'Theme object to customize the appearance',
      table: { type: { summary: 'YTheme' } },
    },
    useBg: {
      control: 'select',
      options: [false, true, ...COMPOSE_BG_TOKENS],
      description:
        'Background to paint on the root. `true` uses the theme background (`--color-bg`); ' +
        'a token such as `info` or `accent` uses `--color-bg-<token>`; ' +
        'any other CSS color is passed through.',
      table: { type: { summary: 'boolean | ComposeBgToken | string' } },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppCompose>

const theme = {
  primary: '#3498db',
  secondary: '#2ecc71',
  danger: '#e74c3c',
  background: '#f5f5f5',
  dark: '#333333',
}

const render: Story['render'] = (args) => ({
  components: { AppCompose },
  setup() {
    return { args }
  },
  template: `
    <AppCompose v-bind="args" style="min-height: 12rem; padding: 2rem">
      <p>useBg: <code>{{ String(args.useBg) }}</code></p>
    </AppCompose>
  `,
})

export const Default: Story = { render, args: { theme, useBg: true } }

export const ThemeBackground: Story = { render, args: { theme, useBg: 'color-bg' } }

export const Info: Story = { render, args: { theme, useBg: 'info' } }

export const Accent: Story = { render, args: { theme, useBg: 'accent' } }

export const Elevated: Story = { render, args: { theme, useBg: 'elevated' } }

export const CustomColor: Story = { render, args: { theme, useBg: 'oklch(0.92 0.05 250)' } }

export const NoBackground: Story = { render, args: { theme, useBg: false } }
