<template>
  <header class="y-modal-header">
    <slot>
      <div class="flex justify-between">
        <h2 class="margin-0">{{ header }}</h2>
        <CloseIcon
          v-if="props.hasCloseButton"
          class="cursor-pointer align-self-start"
          :width="48"
          :height="48"
          @click="close"
        />
      </div>
    </slot>
  </header>
</template>
<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import { inject } from 'vue'
import type { ModalActionsKeyInterface } from '../types'
import { modalActionsKey } from '../types'
import { YModalHeaderProps } from '../types/YBaseModal.interface'

const props = withDefaults(defineProps<YModalHeaderProps>(), {
  hasCloseButton: true,
  header: 'Modal Component',
})

const { close } = inject(modalActionsKey) as ModalActionsKeyInterface
</script>
