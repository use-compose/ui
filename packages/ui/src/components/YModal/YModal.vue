<template>
  <Teleport to="body">
    <YOverlay v-model="isVisible" :z-index="zIndex" @click="close">
      <Transition appear :name="transitionName">
        <YBaseModal v-if="isVisible" v-bind="props" @click.stop>
          <template #header>
            <slot name="header" />
          </template>

          <slot />

          <template #footer>
            <slot name="footer" />
          </template>
        </YBaseModal>
      </Transition>
    </YOverlay>
  </Teleport>
</template>

<script lang="ts">
import { YOverlay } from '@/components/YOverlay'
import { useModal } from '@/composables/modal'
import { defineComponent, type SetupContext } from 'vue'
import { YBaseModal } from '.'
import type { BaseModalProps } from './types/YBaseModal.interface'
import { modalPropsDefinition } from './utils/modal-default-props'

export default defineComponent({
  name: 'YModal',
  components: {
    YBaseModal,
    YOverlay,
  },
  props: {
    ...modalPropsDefinition,
  },
  setup(props: BaseModalProps & { modelValue: boolean }, context: SetupContext) {
    // if (context) {
    const { transitionName, isVisible, close, zIndex } = useModal({
      props,
      modalContext: context,
    })

    return {
      transitionName,
      props,
      isVisible,
      close,
      zIndex,
    }
  },
})
</script>
