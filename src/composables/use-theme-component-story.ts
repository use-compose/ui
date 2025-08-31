import { ArgTypes, StoryObj } from '@storybook/vue3'
import { Component } from 'vue'
import { ThemeComponentBaseProps } from './component-theme'

// const themeComponentMeta = {
//   title: 'Components/Form/YButton',
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
    state: 'base',
    raw: false,
    size: 'medium',
    color: 'primary',
    variant: 'contained',
  }

  const commonArgTypes: ArgTypes = {
    raw: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    color: { control: 'select', options: ['primary', 'secondary', 'default', 'danger'] },
    variant: { control: 'select', options: ['contained', 'outlined', 'text'] },
    state: { control: 'select', options: ['base', 'hover', 'active', 'focus', 'disabled'] },
  }

  // const defaultRenderFunction: ArgsStoryFn<VueRenderer> = (args) => ({
  //   components: { component },
  //   context: args,
  //   template,
  // })

  const renderDefaultStory: Story = {
    render: (args: T, { argTypes }: ArgTypes) => ({
      components: { component },
      template: `
        <Component :is="component"  v-bind="args" >
          <slot />
        </Component>
      `,
      props: Object.keys(argTypes),
      setup() {
        return { args, component }
      },
    }),
  }

  function generateCommonStories(componentBaseStory: Story = renderDefaultStory): {
    Default: Story
    Primary: Story
    Outlined: Story
    Disabled: Story
    Raw: Story
    Large: Story
    Small: Story
  } {
    const Default = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args },
    }

    const Primary: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, color: 'primary' },
    }

    const Outlined: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, variant: 'outlined' },
    }

    const Disabled: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, state: 'disabled' },
    }

    const Raw: Story = {
      ...componentBaseStory,
      args: { ...commonArgs, ...componentBaseStory.args, raw: true },
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
