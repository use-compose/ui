---
to: src/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.stories.ts
---

import type { Meta, StoryObj } from '@storybook/vue3-vite'
import <%= name %> from './<%= name %>.vue'
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<<%= name %>Props>(<%= name %>)

const meta: Meta<typeof <%= name %>> = {
  // TODO: TO CHANGE PATH
  title: 'Components/<%= name %>',
  component: <%= name %>,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
};
 
export default meta;
type Story = StoryObj<typeof <%= name %>>;

const renderGenericStory: Story = {
  render: (args, { argTypes }) => ({
    components: { <%= name %> },
    props: Object.keys(argTypes),
    template: `
      <<%= name %> v-bind="args" />
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
