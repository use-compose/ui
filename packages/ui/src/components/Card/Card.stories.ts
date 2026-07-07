import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { YTag } from '@/components/YTag'
import Card from './Card.vue'

const meta: Meta<typeof Card> = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    headingLevel: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6] },
  },
  args: {
    title: 'Card Title',
    description: 'A short description of the card content.',
    headingLevel: 2,
  },
}

export default meta
type Story = StoryObj<typeof Card>

// Props only — no slots
export const Default: Story = {}

// Props + image slot
export const WithImage: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #image>
          <img src="https://picsum.photos/seed/card/800/450" alt="A mountain landscape" />
        </template>
      </Card>
    `,
  }),
}

// src / alt props (no slot needed for simple image)
export const ImageProps: Story = {
  args: {
    title: 'Via Props',
    description: 'Image passed through src/alt props — no slot required.',
    src: 'https://picsum.photos/seed/props/800/450',
    alt: 'A forest path',
  },
}

// Tags slot — uses YTag
export const WithTags: Story = {
  render: (args) => ({
    components: { Card, YTag },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #tags>
          <YTag>Design</YTag>
          <YTag>Vue</YTag>
        </template>
      </Card>
    `,
  }),
}

// Actions slot — secondary links sit above stretched link
export const WithActions: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #actions>
          <a href="#share" style="font-size:0.875rem">Share</a>
          <a href="#save" style="font-size:0.875rem">Save</a>
        </template>
      </Card>
    `,
  }),
}

// Stretched link — whole card is clickable via href prop
export const Clickable: Story = {
  render: (args) => ({
    components: { Card, YTag },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #image>
          <img src="https://picsum.photos/seed/click/800/450" alt="" />
        </template>
        <template #tags>
          <YTag>Accessibility</YTag>
        </template>
        <template #actions>
          <a href="#secondary" style="font-size:0.875rem">Secondary link</a>
        </template>
      </Card>
    `,
  }),
  args: {
    title: 'Fully Clickable Card',
    description: 'The full card surface links via href. Tags and actions remain independently clickable above the stretched link.',
    href: '#card',
  },
}

// Custom header slot — replaces the default heading entirely
export const CustomHeader: Story = {
  render: (args) => ({
    components: { Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #header>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="width:32px;height:32px;border-radius:50%;background:var(--_card-border);display:inline-block;flex-shrink:0" />
            <div>
              <p style="margin:0;font-weight:600;line-height:1.2">Author Name</p>
              <p style="margin:0;font-size:0.8rem;opacity:0.6">Published May 2026</p>
            </div>
          </div>
        </template>
      </Card>
    `,
  }),
  args: {
    title: undefined,
    description: 'The header slot replaces the default heading — useful for author cards, product tiles, or any custom layout.',
  },
}
