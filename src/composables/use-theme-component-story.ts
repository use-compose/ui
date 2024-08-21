import { ThemeComponentBaseProps } from '@/utils/base-props'
import { ArgTypes, StoryFn } from '@storybook/vue3'
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

export function useThemeComponentStory<T extends ThemeComponentBaseProps>(component: Component) {
  const commonArgs = {
    raw: false,
    disabled: false,
    outlined: false,
    interactive: false,
  }

  const commonArgTypes: ArgTypes = {
    raw: { control: 'boolean' },
    disabled: { control: 'boolean' },
    outlined: { control: 'boolean' },
    interactive: { control: 'boolean' },
  }

  const renderTemplate = (args: ThemeComponentBaseProps & Partial<T>) => ({
    // const componentName = component.name
    template: `
      <${component.name} v-bind="args">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum hic harum architecto quisquam
          consequatur minima a rerum, alias minus nihil perspiciatis voluptate asperiores quaerat
          blanditiis temporibus accusantium cum. Exercitationem, dicta?
        </p> 
        <Flex justify="flex-end" align="flex-end"><YButton @click="handleClick" v-bind="args" style="--component-margin-bottom: 0">YButton</YButton></Flex>
      </${component.name}>
    `,
    context: args,
    // return {
    //   components: { [componentName as string]: component },
    //   setup() {
    //     return { args }
    //   },
    //   template: args.template,
    // }
  })

  function generateCommonStories(Template: StoryFn<Component>) {
    const Default = Template.bind({})
    Default.args = { ...commonArgs }

    const Outlined = Template.bind({})
    Outlined.args = { ...commonArgs, outlined: true }

    const Disabled = Template.bind({})
    Disabled.args = { ...commonArgs, disabled: true }

    const Raw = Template.bind({})
    Raw.args = { ...commonArgs, raw: true }

    return {
      Default,
      Outlined,
      Disabled,
      Raw,
    }
  }

  return {
    commonArgs,
    commonArgTypes,
    renderTemplate,
    generateCommonStories,
  }
}
