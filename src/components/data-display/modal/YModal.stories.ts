import type { Meta, StoryObj } from '@storybook/vue3'

import { BaseComponent, ModalProvider, YButton } from '@/components'
import { useModal, useThemeComponentStory } from '@/composables'
import { markRaw, provide, reactive } from 'vue'
import { modalKey, ModalState, ShowModalParams } from './types/modal-symbol'
import type { BaseModalProps } from './types/YBaseModal.interface'
import { allowScroll, preventScroll } from './utils/prevent-scroll'
import YBaseModal from './YBaseModal.vue'

const { commonArgTypes, generateCommonStories } = useThemeComponentStory(YBaseModal)

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof YBaseModal> = {
  title: 'Compose/DataDisplay/YModal',
  component: YBaseModal,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/vue/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    ...commonArgTypes,
    hasCloseButton: { control: 'boolean' },
    hasHeader: { control: 'boolean' },
    header: { control: 'text' },
    hasMainSlot: { control: 'boolean' },
    mainSlot: { control: 'text' },
    hasFooter: { control: 'boolean' },
    hasButtonGroupRight: { control: 'boolean' },
    hasButtonGroupLeft: { control: 'boolean' },
    size: { control: 'text' },
    type: { control: 'text' },
  },
  args: {
    hasCloseButton: false,
    hasHeader: false,
    hasMainSlot: false,
    hasFooter: false,
    hasButtonGroupRight: false,
    hasButtonGroupLeft: false,
    size: 'medium',
    type: 'default',
  },
}

export default meta

type Story = StoryObj<typeof meta>

const ModalTemplate: Story = {
  render: (args: BaseModalProps, { argTypes }) => ({
    components: { ModalProvider },
    props: Object.keys(argTypes),
    template: `
    <ModalProvider>
      <slot />
    </ModalProvider>
  `,
    setup() {
      const modalState = reactive<ModalState>({
        isVisible: false,
        component: undefined,
        props: {},
        slots: {},
      })

      const defaultShowModalParams: ShowModalParams = {
        component: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Est modi, earum vel quo architecto numquam reprehenderit nesciunt tempore!
        Enim eaque et tempore, voluptas fugit reprehenderit beatae commodi aliquam eveniet amet.</p>`,
        props: {
          hasHeader: true,
          header: 'Modal Component',
          size: 'medium',
        },
      }

      // Function to open modal with dynamic component and props
      function show({ component, props, slots }: ShowModalParams = defaultShowModalParams) {
        modalState.component = markRaw(component)
        modalState.props = props
        modalState.slots = slots
        modalState.isVisible = true
        preventScroll()
      }

      // Function to close modal
      function close() {
        modalState.isVisible = false
        allowScroll()
      }

      // Provide openModal and closeModal functions so any component can access them
      provide(modalKey, { show, close, modalState })
      return { args }
    },
  }),
  args: {},
}

const renderGenericStory: Story = {
  render: (args: BaseModalProps, { argTypes }) => ({
    components: { YBaseModal, ModalProvider, YButton },
    props: Object.keys(argTypes),
    template: `
      <ModalProvider>
        <YButton @click="toggleModal">openCustomModal</YButton>
      </ModalProvider>
    `,
    setup() {
      const {
        show,
        close,
        modalState: { isVisible },
      } = useModal()

      // const newModelLol = show({
      //   component: BaseComponent,
      //   props: {
      //     hasHeader: true,
      //     size: 'large',
      //   },
      //   slots: {
      //     header: 'Custom Header',
      //   },
      // })

      function openCustomModal() {
        show({
          component: BaseComponent,
          props: {
            ...args,
          },
        })
      }

      const toggleModal = () => {
        if (isVisible) {
          close()
        } else {
          openCustomModal()
        }
      }
      return { args, toggleModal }
    },
  }),
  args: {},
}

const Default: Story = {
  ...renderGenericStory,
  args: {
    hasHeader: true,
    header: 'Modal Component',
    size: 'medium',
  },
}

const { Outlined, Raw } = generateCommonStories(renderGenericStory)

export { Default, Outlined, Raw }
