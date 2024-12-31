<template>
  <Teleport to="body">
    <YOverlay v-model="isVisible" @click="close" />

    <Transition :name="transitionName">
      <YBaseModal v-if="isVisible" v-bind="props">
        <template #header>
          <slot name="header" />
        </template>

        <slot />

        <template #footer>
          <slot name="footer" />
        </template>
      </YBaseModal>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { YOverlay } from '@/components/overlays'
import { computed, provide, useAttrs, watch } from 'vue'
import { YBaseModal } from '.'
import { modalActionsKey, ModalActionsKeyInterface } from './types'
import type { BaseModalProps } from './types/YBaseModal.interface'
import { YModalSize, YModalType } from './types/YBaseModal.interface'
import { allowScroll, modalDefaultProps, preventScroll } from './utils'

const props = withDefaults(defineProps<BaseModalProps & { modelValue: boolean }>(), {
  ...modalDefaultProps,
  hasCloseButton: true,
  size: YModalSize.Medium,
  modelValue: false,
})

const transitionName = computed(() => {
  return props.type === YModalType.Default ? 'fade' : 'drawer-slide'
})

// const { close, isVisible } = inject(modalActionsKey) as ModalActionsKeyInterface
const emit: (event: string, ...args: any[]) => void = defineEmits([
  'update:modelValue',
  'close',
  'action',
  'cancel',
])

const attrs = useAttrs()
console.log('📟 - file: YModal.vue:51 - attrs → ', attrs.onCancel)
// const { open, close, isVisible } = useModal({ attrs: props, emit })

// We first declare open and close which are always always available
function open() {
  // TODO-NUXT-3: Replace with emit('update:modelValue', true)
  emit('update:modelValue', true)
}

function close() {
  // TODO-NUXT-3: Replace with emit('update:modelValue', false)
  emit('update:modelValue', false)
}

const modalActions: ModalActionsKeyInterface = {
  open,
  close,
}

// Based on their existence, we add the other actions
function cancel() {
  emit('cancel')
}
if (attrs.onCancel) {
  modalActions.cancel = cancel
}

function action() {
  emit('action')
}
if (attrs.action) {
  modalActions.action = action
}

// We wrap the value from the v-model in a computed property
// to avoid the warning about mutating a prop directly
// as value / modelValue can not be directly used as a prop
const isVisible = computed(() => {
  return props.modelValue
})

// We watch the value of the model and prevent scrolling when the modal is open
watch(
  () => props.modelValue,
  (value) => {
    console.log('watch modelValue', value)
    if (value) {
      preventScroll()
    } else {
      allowScroll()
    }
  },
)

provide(modalActionsKey, modalActions)
</script>
