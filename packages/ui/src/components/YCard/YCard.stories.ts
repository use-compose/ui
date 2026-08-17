import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YCard from './YCard.vue'

const meta: Meta<typeof YCard> = {
  title: 'Components/Data Display/YCard',
  component: YCard,
  tags: ['autodocs'],
  argTypes: {
    tag: { control: 'text' },
    title: { control: 'text' },
    href: { control: 'text' },
    headingLevel: { control: 'select', options: [1, 2, 3, 4, 5, 6] },
    flat: { control: 'boolean' },
  },
  args: {
    tag: 'CSS Trick',
    title: 'Block links, the inclusive way',
    href: '#',
    flat: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

// The "block link" pattern from https://inclusive-components.design/cards/
// (also used by brutally-css's `.m-card`): only the title is a real <a>, a
// stretched ::after on it covers the whole card, and the meta-slot author
// link stays independently clickable via `.y-card-interactive`. Hover/focus
// the title to see the brutalist offset-shadow pop.
export const Default: Story = {
  render: (args) => ({
    components: { YCard },
    setup: () => ({ args }),
    template: `
      <YCard v-bind="args">
        <p>The whole card is clickable, yet there's still only one real, keyboard-focusable link.</p>
        <template #meta>By <a href="#">Author Name</a></template>
      </YCard>
    `,
  }),
}

export const WithMedia: Story = {
  render: (args) => ({
    components: { YCard },
    setup: () => ({ args }),
    template: `
      <YCard v-bind="args">
        <template #media />
        <p>A decorative media block above the content, matching brutally-css's placeholder.</p>
      </YCard>
    `,
  }),
}

export const Flat: Story = {
  args: { flat: true },
  render: (args) => ({
    components: { YCard },
    setup: () => ({ args }),
    template: `<YCard v-bind="args"><p>No hover/focus pop on this one.</p></YCard>`,
  }),
}

// Matches brutally-css's `.m-card-grid`: a plain responsive auto-fit grid,
// no dedicated grid component needed.
export const Grid: Story = {
  render: () => ({
    components: { YCard },
    template: `
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr)); gap: 1rem;">
        <YCard tag="CSS Trick" title="Block links, the inclusive way" href="https://inclusive-components.design/cards/">
          <p>The whole card is clickable, yet there's still only one real, keyboard-focusable link.</p>
          <template #meta>By <a href="#">Heydon Pickering</a></template>
        </YCard>
        <YCard tag="Accessibility" title="A second card to show the grid" href="#">
          <p>Try tabbing through both cards — only the title link and the author link receive focus.</p>
        </YCard>
      </div>
    `,
  }),
}

// Props cover the common case, but the card stays free-form: drop straight
// into the default slot and hand-roll `.y-card-link`/`.y-card-interactive`
// for full control over markup.
export const Custom: Story = {
  render: () => ({
    components: { YCard },
    template: `
      <YCard>
        <p style="margin: 0 0 0.25rem">Category</p>
        <h3 style="margin: 0 0 0.5rem">
          <a href="#" class="y-card-link">A fully custom title</a>
        </h3>
        <p>Free-form content — no title/href props used here.</p>
      </YCard>
    `,
  }),
}
