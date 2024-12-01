<template>
  <!-- Render slot content as the main app content -->
  <slot />

  <!-- Only render YBaseModal when a component is passed to `openModal` -->
  <Teleport to="body">
    <YOverlay v-if="modalState.isVisible" @click="close" />

    <Transition appear :name="transitionName">
      <YBaseModal v-if="modalState.isVisible" v-bind="modalState.props" @close="close">
        <!-- Render the dynamic component passed to openModal -->
        <Component :is="modalState.component" v-if="modalState.component" />
      </YBaseModal>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { YOverlay } from '@/components/overlays'
import { computed, markRaw, provide, reactive } from 'vue'
import { YBaseModal } from '../data-display'
import { modalKey, ModalState, ShowModalParams } from '../data-display/modal/types/modal-symbol'
import { allowScroll, preventScroll } from '../data-display/modal/utils/prevent-scroll'

const transitionName = computed(() => {
  return 'fade'
})

// Define the modal state
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
</script>
