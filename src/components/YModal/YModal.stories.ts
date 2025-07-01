import type { Meta, StoryObj } from '@storybook/vue3'

import { YButton, YModal } from '@/components'
import { YInputText } from '@/components/YInputText'
import { modalDefaultProps, useThemeComponentStory } from '@/composables'
import { ref } from 'vue'
import { YModalSize, YModalType, type BaseModalProps } from './types/YBaseModal.interface'
import YBaseModal from './YBaseModal.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YBaseModal)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YBaseModal> = {
  title: 'Components/Overlays/YModal',
  component: YBaseModal,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    hasCloseButton: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    header: { control: 'text' },
    hasVerticalHeader: { control: 'boolean' },
    mainSlot: { control: 'text' },
    hasFooter: { control: 'boolean' },
    actionBtnText: { control: 'text' },
    cancelBtnText: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: [YModalSize.Small, YModalSize.Medium, YModalSize.Large],
    },
    type: {
      control: { type: 'select' },
      options: [YModalType.Default, YModalType.Drawer, YModalType.FullScreen],
    },
  },
  args: {
    ...modalDefaultProps,
  },
}

export default meta

type Story = StoryObj<typeof meta>

const renderTemplate = (args: BaseModalProps & { modelValue: boolean }) => {
  switch (args.type) {
    case YModalType.Drawer:
      return `
        <YModal v-bind="args" v-model="isVisible">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec pur</p>
          <YInputText value="Example value" placeholder="Enter your name" />
        </YModal>`
    case YModalType.Default:
      return `
        <YModal v-bind="args" v-model="isVisible">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec
            ligula luctus aliquam. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.
          </p>
        </YModal>`
    default:
      return `
        <YModal v-bind="args" v-model="isVisible">
          <p>{{ args.mainSlot }}</p>
        </YModal>`
  }
}

const DefaultStory: Story = {
  render: (args: BaseModalProps & { modelValue: boolean }, { argTypes }) => ({
    components: { YModal, YButton, YInputText },
    props: Object.keys(argTypes),
    template: `
      <div>
        <YButton @click="openModal">Open ${args.type === YModalType.Drawer ? 'Drawer' : 'Modal'}</YButton>
        ${renderTemplate(args)}
      </div>
    `,
    setup() {
      const isVisible = ref<boolean>(args.modelValue)

      const openModal = () => {
        isVisible.value = true
      }

      return { args, isVisible, openModal }
    },
  }),
  args: {},
}

const Default: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    size: YModalSize.Medium,
  },
}

const Drawer: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    type: YModalType.Drawer,
  },
}

const { Raw } = generateCommonStories(DefaultStory)

export { Default, Drawer, Raw }
