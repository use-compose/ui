import type { Meta, StoryObj } from '@storybook/vue3-vite'
import YHeader from './YHeader.vue'
import type { YHeaderProps } from './types'

const meta: Meta<typeof YHeader> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Layout/YHeader',
  component: YHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    fixed: {
      control: 'boolean',
    },
    transparent: {
      control: 'boolean',
    },
  },
  args: {
    title: 'YHeader',
    fixed: true,
    transparent: true,
  } satisfies YHeaderProps,
}

export default meta
type Story = StoryObj<typeof meta>

const Default: Story = {
  render: (args: YHeaderProps, { argTypes }) => ({
    components: { YHeader },
    props: Object.keys(argTypes),
    template: `
      <YHeader v-bind="args" />
    `,
    setup() {
      return {
        args,
      }
    },
  }),
  args: {
    title: 'YHeader',
    fixed: true,
    transparent: true,
  },
}

export { Default }
