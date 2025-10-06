import type { ArgTypes, Meta, StoryObj } from '@storybook/vue3-vite'
import { BaseModalProps } from './../../../storybook-static/src/components/overlays/modal/types/YBaseModal.interface.d'

import { YButton, YModal } from '@/components'
import { YInputText } from '@/components/YInputText'
import { modalDefaultProps, useThemeComponentStory } from '@/composables'
import { computed, ref } from 'vue'
import YDropdown from '../YDropdown/YDropdown.vue'
import { YModalSize, YModalType } from './types/YBaseModal.interface'
import YBaseModal from './YBaseModal.vue'

const { generateCommonStories } = useThemeComponentStory(YBaseModal)

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

const renderTemplate = (args: BaseModalProps) => {
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
  render: (args: BaseModalProps, { argTypes }) => ({
    components: { YModal, YButton, YInputText },
    props: Object.keys(argTypes).concat(['modelValue']),
    template: `
      <div>
        <YButton @click="openModal">Open ${args.type === YModalType.Drawer ? 'Drawer' : 'Modal'}</YButton>
        ${renderTemplate(args)}
      </div>
    `,
    setup() {
      const isVisible = ref<boolean>(args.modelValue || false)

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

export const NestedModal: Story = {
  render: (args: BaseModalProps, { argTypes }: ArgTypes) => ({
    components: { YModal, YButton },
    props: Object.keys(argTypes),
    template: `
      <div>
        <YButton @click="openFirstModal">Open First Modal</YButton>
        <YModal v-bind="args" v-model="isFirstModalVisible" @action="openSecondModal" @cancel="closeFirstModal">
          <p>First Modal Content</p>
        </YModal>
        <YModal v-bind="secondModalProps" v-model="isSecondModalVisible" size="small" @action="closeSecondModal">
          <p>Second Modal Content</p>
        </YModal>
      </div>
    `,
    setup(props: BaseModalProps) {
      const isFirstModalVisible = ref(false)
      const isSecondModalVisible = ref(false)

      const openFirstModal = () => {
        isFirstModalVisible.value = true
      }
      const closeFirstModal = () => {
        isFirstModalVisible.value = false
      }

      const openSecondModal = () => {
        isSecondModalVisible.value = true
      }
      const closeSecondModal = () => {
        isSecondModalVisible.value = false
      }
      const secondModalProps = computed(() => {
        return {
          ...args,
          size: YModalSize.Small,
        }
      })

      return {
        props,
        args,
        openFirstModal,
        isFirstModalVisible,
        closeFirstModal,
        openSecondModal,
        isSecondModalVisible,
        closeSecondModal,
        secondModalProps,
      }
    },
  }),
}

export const ModalWithSelectInput: Story = {
  render: (args: BaseModalProps, { argTypes }: ArgTypes) => ({
    components: { YModal, YButton, YDropdown },
    props: Object.keys(argTypes),
    template: `
      <div>
        <YButton @click="openModal" tone="brand">Open Modal</YButton>
        <YModal v-bind="args" v-model="showModal" @action="close" @cancel="close">
          <YDropdown v-model="selectedOption" :options="options" />
        </YModal>
      </div>
    `,
    setup(props: BaseModalProps) {
      const options = [
        { key: 'option1', label: 'Option 1' },
        { key: 'option2', label: 'Option 2' },
        { key: 'option3', label: 'Option 3' },
      ]
      const showModal = ref(false)
      const selectedOption = ref('option1')

      const openModal = () => {
        showModal.value = true
      }

      const close = () => {
        showModal.value = false
      }

      return { args: props, openModal, showModal, close, selectedOption, options }
    },
  }),
}

const { Raw } = generateCommonStories(DefaultStory)

export { Default, Drawer, Raw }
