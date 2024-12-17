<template>
  <footer class="y-modal-footer" :class="footerClasses">
    <slot>
      <template v-if="hasButtonGroupLeft">
        <YButton @click="leftAction">
          {{ leftBtnText }}
        </YButton>
      </template>

      <template v-if="hasButtonGroupRight">
        <YButton v-if="hasCancelBtn" color="secondary" @click="cancel">
          {{ cancelBtnText }}
        </YButton>

        <YButton @click="handleAction">
          {{ actionBtnText }}
        </YButton>
      </template>
    </slot>
  </footer>
</template>

<script setup lang="ts">
import { YButton } from '@/components'
import { computed, inject } from 'vue'
import { modalActionsKey, ModalActionsKeyInterface } from '../types'
import { YModalFooterProps } from '../types/YBaseModal.interface'

const { action, cancel, leftAction, close } = inject(modalActionsKey) as ModalActionsKeyInterface

const props = defineProps<YModalFooterProps>()

const hasCancelBtn = computed(() => !!cancel)

function handleAction() {
  if (!!action) {
    action()
  } else {
    close()
  }
}

const { hasButtonGroupRight, hasButtonGroupLeft, actionBtnText, cancelBtnText, leftBtnText } = props

const footerClasses = computed(() => {
  return {
    'justify-end': hasButtonGroupRight && !hasButtonGroupLeft,
    'justify-between': hasButtonGroupLeft && hasButtonGroupRight,
    'justify-start': !hasButtonGroupRight && hasButtonGroupLeft,
  }
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/utils';

.y-modal-footer {
  display: flex;
  gap: layout(gap);
  padding: space(sm) space(md);

  :deep(.y-button) {
    @include component(margin-bottom, component(box-shadow-y));
  }
}
</style>
