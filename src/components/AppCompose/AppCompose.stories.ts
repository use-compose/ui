import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppCompose from './AppCompose.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<AppComposeProps>(AppCompose)

const meta: Meta<typeof AppCompose> = {
  // TODO: TO CHANGE PATH
  title: 'Components/Core/AppCompose',
  component: AppCompose,
  tags: ['autodocs'],
  argTypes: {
    //   theme: { control: 'object', description: 'Theme object to customize the appearance', table: { type: { summary: 'YTheme' } },
    //   value: { summary: 'YTheme' }, detail: 'YTheme interface',
    // },
    //   useBgColor: { control: 'boolean' },
    // ...commonArgTypes,
  },
  args: {
    // theme: {
    //   // Define your theme properties here
    // },
    // useBgColor: true,
  },
  // ...commonArgs,
}

export default meta
type Story = StoryObj<typeof AppCompose>

const renderGenericStory: Story = {
  render: (args) => ({
    components: { AppCompose },
    template: `
      <AppCompose v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
  args: {
    theme: {
      primary: '#3498db',
      secondary: '#2ecc71',
      danger: '#e74c3c',
      background: '#f5f5f5',
      dark: '#333333',
    },
    useBg: true,
  },
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
