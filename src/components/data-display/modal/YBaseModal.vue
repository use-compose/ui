<template>
  <div ref="dialogRef" :class="yModalClasses" aria-modal="true" role="dialog" tabindex="-1">
    <YModalHeader v-if="hasHeader" v-bind="yModalHeaderProps" @close="close">
      <template v-slot:default>
        <slot name="headerSlot" />
      </template>
    </YModalHeader>
    <section class="y-modal-content">
      <slot>
        <div>
          <h4>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est modi, earum vel quo
            architecto numquam reprehenderit nesciunt tempore! Enim eaque et tempore, voluptas fugit
            reprehenderit beatae commodi aliquam eveniet amet.
          </h4>
        </div>
      </slot>
    </section>
    <YModalFooter v-if="hasFooter" v-bind="yModalFooterProps" @close="close">
      <template v-slot:default>
        <slot name="footerSlot" />
      </template>
    </YModalFooter>
  </div>
</template>

<script lang="ts" setup>
import { YModalHeader } from '@/components/data-display/modal'
import { useBaseProps } from '@/composables'
import { modalDefaultProps } from '@/composables/components'
import { computed, defineEmits } from 'vue'
import YModalFooter, { BaseModalFooterProps } from './components/YModalFooter.vue'
import { BaseModalHeaderProps } from './components/YModalHeader.vue'
import { BaseModalProps } from './types/YBaseModal.interface'

const props = withDefaults(defineProps<BaseModalProps>(), {
  ...modalDefaultProps,
  size: 'medium',
})

const { baseClasses } = useBaseProps(props)

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const yModalClasses = computed(() => {
  return [{ ...baseClasses.value }, 'y-modal', `size-${props.size}`]
})

const yModalHeaderProps = computed<BaseModalHeaderProps>(() => {
  return {
    hasCloseButton: props.hasCloseButton,
    hasHeader: props.hasHeader,
    header: props.header,
    hasVerticalHeader: props.hasVerticalHeader,
  }
})

const yModalFooterProps = computed<BaseModalFooterProps>(() => {
  return {
    hasAction: props.hasAction,
    action: props.action,
  }
})

const hasFooter = computed(() => props.hasButtonGroupLeft || props.hasButtonGroupRight)
</script>

<style lang="scss">
@import '@/assets/scss/utils';

.y-modal {
  @include theme-component;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  max-width: 100%;
  max-height: 100%;
}

.y-modal-content {
  padding: space(sm) space(md);
}
</style>
