import { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import YTimeline from './YTimeline.vue'
import type { YTimelineProps } from './YTimeline.types'
import YTimelineItem from './YTimelineItem/YTimelineItem.vue'

const items = [
  {
    tag: 'Step 1',
    title: 'Pick the components',
    description: 'Choose which primitives the screen is built from.',
  },
  {
    tag: 'Step 2',
    title: 'Compose the layout',
    description: 'Stack them with the cube layouts so the spacing stays consistent.',
    highlighted: true,
  },
  {
    tag: 'Step 3',
    title: 'Ship it',
    description: 'The last item closes the rail with a terminator dot.',
  },
]

const meta: Meta<typeof YTimeline> = {
  title: 'Components/Data Display/YTimeline',
  component: YTimeline,
  subcomponents: { YTimelineItem },
  tags: ['autodocs'],
  argTypes: {
    ordered: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    color: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
  },
  args: {
    ordered: false,
    collapsible: false,
    color: 'primary',
    variant: 'contained',
  },
} satisfies Meta<typeof YTimeline>

export default meta

type Story = StoryObj<typeof meta>

// `args` is bound to the timeline only — each item carries its own data, and
// the item's position in the rail (first, last) is read from the DOM by CSS
// rather than passed in.
const renderTemplate = (args: YTimelineProps, { argTypes }: ArgTypes) => ({
  components: { YTimeline, YTimelineItem },
  props: Object.keys(argTypes),
  template: `
    <YTimeline v-bind="args">
      <YTimelineItem
        v-for="item in items"
        :key="item.title"
        :tag="item.tag"
        :title="item.title"
        :description="item.description"
        :highlighted="item.highlighted"
      />
    </YTimeline>
  `,
  setup() {
    return { args, items }
  },
})

export const Default: Story = {
  render: renderTemplate,
}

export const Collapsible: Story = {
  args: { collapsible: true },
  render: renderTemplate,
}

export const Ordered: Story = {
  args: { ordered: true },
  render: renderTemplate,
}

export const Secondary: Story = {
  args: { color: 'secondary' },
  render: renderTemplate,
}

export const CustomSlotContent: Story = {
  render: (args: YTimelineProps, { argTypes }: ArgTypes) => ({
    components: { YTimeline, YTimelineItem },
    props: Object.keys(argTypes),
    template: `
      <YTimeline v-bind="args">
        <YTimelineItem tag="Released" title="Version 0.9" :heading-level="4">
          <p>The default slot replaces <code>description</code> when you need markup.</p>
          <p>Anything here counts as content, so the toggle still appears when collapsible.</p>
        </YTimelineItem>
        <YTimelineItem tag="Next" title="Version 1.0" description="Plain string description." />
      </YTimeline>
    `,
    setup() {
      return { args }
    },
  }),
}
