import type { Meta, StoryObj } from '@storybook/vue'

import { RtButton } from '../RtButton'
import RtDropdown from './RtDropdown.vue'
import { RtDropdownProps } from './types'

const meta: Meta<typeof RtDropdown> = {
  component: RtDropdown,
  // TODO: TO CHANGE PATH
  title: 'Components/Overlays/RtDropdown',
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['default', 'hover', 'active', 'focus', 'disabled']
    }
  },
  args: {
    state: 'default'
  }
}

export default meta
export type DropdownStory = StoryObj<typeof RtDropdown>

const renderGenericStory: DropdownStory = {
  render: (args: RtDropdownProps) => ({
    components: { RtDropdown, RtButton },
    props: Object.keys(args),

    setup() {
      return { args }
    },
    template: `
    <RtDropdown v-bind="args">
    <template #default="{ toggle, isOpen }">
      <RtButton @click="toggle" class="btn btn-primary">
        {{ isOpen ? 'Close Dropdown' : 'Open Dropdown' }}
      </RtButton>
    </template>
      <template #dropdown>
        <ul class="dropdown-menu">
          <li><a href="#" class="dropdown-item">Item 1</a></li>
          <li><a href="#" class="dropdown-item">Item 2</a></li>
          <li><a href="#" class="dropdown-item">Item 3</a></li>
        </ul>
      </template>
    </RtDropdown>`
  }),
  args: {
    state: 'default'
  }
}

const Default: DropdownStory = {
  ...renderGenericStory,
  args: {
    state: 'default'
  }
}

export { Default }
