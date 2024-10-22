import { ThemeComponentBaseProps } from '@/utils/base-props'
import { ArgTypes, StoryObj } from '@storybook/vue3'
import { Component } from 'vue'

// const themeComponentMeta = {
//   title: 'Compose/Form/YButton',
//   component: ThemeComponent,
//   // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
//   tags: ['autodocs'],
//   argTypes: {
//     size: { control: 'select', options: ['small', 'medium', 'large'] },
//     disabled: { control: 'boolean' },
//     default: {
//       control: 'text',
//       description: 'Slot content',
//       defaultValue: 'Badge',
//     },
//     onClick: { action: 'handleClick' },
//     // backgroundColor: { control: "color" },
//     // onClick: { action: "handleClick"},
//   },
//   args: {}, // default value
// } satisfies Meta<typeof ThemeComponent>

type Story = StoryObj<Component>

export function useThemeComponentStory<T extends ThemeComponentBaseProps>(component: Component) {
  const commonArgs: ThemeComponentBaseProps = {
    raw: false,
    disabled: false,
    outlined: false,
    interactive: false,
    size: 'medium',
    color: 'primary',
  }

  const commonArgTypes: ArgTypes = {
    raw: { control: 'boolean' },
    disabled: { control: 'boolean' },
    outlined: { control: 'boolean' },
    interactive: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'default'] },
  }

  // const defaultRenderFunction: ArgsStoryFn<VueRenderer> = (args) => ({
  //   components: { component },
  //   context: args,
  //   template,
  // })

  const renderDefaultStory: Story = {
    render: (args: T) => ({
      components: { component },
      template: '<Component :is="component" v-bind="args" />',
      setup() {
        return { args }
      },
    }),
    args: { ...commonArgs },
  }

  function generateCommonStories(componentBaseStory: Story = renderDefaultStory): {
    Default: Story
    Primary: Story
    Outlined: Story
    Disabled: Story
    Raw: Story
    Interactive: Story
    Large: Story
    Small: Story
  } {
    const Default = {
      ...componentBaseStory,
      args: { ...commonArgs },
    }

    const Primary: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, color: 'primary' },
    }

    const Outlined: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, outlined: true },
    }

    const Disabled: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, disabled: true },
    }

    const Raw: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, raw: true },
    }

    const Interactive: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, interactive: true },
    }

    const Large: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, size: 'large' },
    }

    const Small: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, size: 'small' },
    }

    return {
      Default,
      Primary,
      Outlined,
      Disabled,
      Raw,
      Interactive,
      Large,
      Small,
    }
  }

  return {
    commonArgs,
    commonArgTypes,
    renderDefaultStory,
    generateCommonStories,
  }
}
