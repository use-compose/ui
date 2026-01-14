import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ComponentDocs from './ComponentDocs.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<ComponentDocsProps>(ComponentDocs)

const meta: Meta<typeof ComponentDocs> = {
  // TODO: TO CHANGE PATH
  title: 'Components/ComponentDocs',
  component: ComponentDocs,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
}

export default meta
type Story = StoryObj<typeof ComponentDocs>

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { ComponentDocs },
    props: Object.keys(argTypes),
    template: `
      <ComponentDocs v-bind="args" />
  `,
    setup() {
      return { args }
    },
  }),
}

export { renderGenericStory as Default }

// TODO: if you use useThemeComponentStory
// const { Default, Outlined, Disabled, Raw, Small, Large } = generateCommonStories(renderGenericStory)

// export { Default, Outlined, Disabled, Raw, Small, Large }
