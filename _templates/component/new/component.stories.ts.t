---
to: src/components/<%= name %>/<%= name %>.stories.ts
---

import type { Meta , StoryObj} from '@storybook/vue3';
import <%= name %> from './<%= name %>.vue';
import type { <%= name %>Props } from './types';
import { useThemeComponentStory } from '@/composables'

const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<<%= name %>Props>(<%= name %>)

const meta: Meta<typeof <%= name %>> = {
  // TODO: TO CHANGE PATH
  title: 'Compose/<%= name %>',
  component: <%= name %>,
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
  },
  args: {
    ...commonArgs,
  },
};
 
export default meta;
type Story = StoryObj<typeof meta>;

const { Default } = generateCommonStories()

export { Default }