<template>
  <!-- Render slot content as the main app content -->
  <slot />

  <YModal v-model="modalState.isVisible" v-bind="modalState.props">
    <template #header>
      <slot name="header" />
    </template>

    {{ modalState.content }}

    <template #footer>
      <slot name="footer" />
    </template>
  </YModal>
</template>

<script setup lang="ts">
import { provide, reactive } from 'vue'
import { YModal } from '../YModal'
import { YModalSize } from '../YModal/types'
import { modalKey, ModalState, ShowModalParams } from '../YModal/types/modal-symbol'
import { allowScroll, preventScroll } from '../YModal/utils'

// Define the modal state
const modalState = reactive<ModalState>({
  isVisible: false,
  content: undefined,
  props: {},
})

const defaultShowModalParams: ShowModalParams = {
  content: `<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Est modi, earum vel quo architecto numquam reprehenderit nesciunt tempore!
  Enim eaque et tempore, voluptas fugit reprehenderit beatae commodi aliquam eveniet amet.</p>`,
  props: {
    hasHeader: true,
    header: 'Modal Component',
    size: YModalSize.Medium,
  },
}

// Function to open modal with dynamic component and props
function show({ content, props }: ShowModalParams = defaultShowModalParams) {
  modalState.content = content
  modalState.props = props
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
</script>
