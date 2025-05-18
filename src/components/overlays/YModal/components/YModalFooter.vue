<template>
  <footer class="y-modal-footer" :class="footerClasses">
    <slot>
      <YButton @click="handleAction">
        {{ actionBtnText }}
      </YButton>

      <YButton v-if="hasCancelBtn" color="secondary" @click="cancel">
        {{ cancelBtnText }}
      </YButton>
    </slot>
  </footer>
</template>

<script setup lang="ts">
import { YButton } from '@/components'
import { computed, inject } from 'vue'
import { modalActionsKey, ModalActionsKeyInterface } from '../types'
import { YModalFooterProps } from '../types/YBaseModal.interface'

const { action, cancel, close } = inject(modalActionsKey) as ModalActionsKeyInterface

const props = defineProps<YModalFooterProps>()

const hasCancelBtn = computed(() => !!cancel)

function handleAction() {
  if (action) {
    action()
  } else {
    close()
  }
}

const { actionBtnText, cancelBtnText } = props

const footerClasses = computed(() => {
  return {
    'justify-end': !!action && !cancel,
    'justify-between': !!action && !!cancel,
  }
})
</script>
