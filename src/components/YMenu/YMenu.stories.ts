import type { Meta , StoryObj} from '@storybook/vue3';
import YMenu from './YMenu.vue';
import type { YMenuProps } from './types';
// import { useThemeComponentStory } from '@/composables'

// const { commonArgTypes, commonArgs, generateCommonStories } = useThemeComponentStory<YMenuProps>(YMenu)

const meta: Meta<typeof YMenu> = {
  // TODO: TO CHANGE PATH
  title: 'Components/YMenu',
  component: YMenu,
  tags: ['autodocs'],
  argTypes: {
    // ...commonArgTypes,
  },
  args: {
    // ...commonArgs,
  },
};
 
export default meta;
type Story = StoryObj<typeof YMenu>;

const renderGenericStory: Story = {
  render: (args: YMenuProps) => ({
    components: { YMenu },
    props: Object.keys(args),
    template: `
      <YMenu v-bind="args" />
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
