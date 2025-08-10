import YButton from '@/components/YButton/YButton.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import type { YDropdownProps } from './YDropdown.types'
import YDropdown from './YDropdown.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YDropdownProps>(YDropdown)

const meta: Meta<typeof YDropdown> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YDropdown',
  component: YDropdown,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof YDropdown>

const renderGenericStory: Story = {
  render: (args: YDropdownProps) => ({
    components: { YDropdown, YButton },
    props: Object.keys(args),
    template: `
      <YDropdown raw v-bind="args">
    <template #default="{ toggle, isOpen }">
      <YButton  @click="toggle" class="mb-0">
        {{ isOpen ? 'Close Dropdown' : 'Open Dropdown' }}
      </YButton>
    </template>
      <template #dropdown>
        <ul class="dropdown-menu">
          <li><a href="#" class="dropdown-item">Item 1</a></li>
          <li><a href="#" class="dropdown-item">Item 2</a></li>
          <li><a href="#" class="dropdown-item">Item 3</a></li>
        </ul>
      </template>
    </YDropdown>`,
    setup() {
      return { args }
    },
  }),
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
