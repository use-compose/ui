<template>
  <div ref="dialogRef" :class="yModalClasses" aria-modal="true" role="dialog" tabindex="-1">
    <YModalHeader v-if="hasHeader" v-bind="yModalHeaderProps">
      <template v-slot:default>
        <slot name="header" />
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

    <YModalFooter v-if="hasFooter" v-bind="yModalFooterProps">
      <template v-slot:default>
        <slot name="footer" />
      </template>
    </YModalFooter>
  </div>
</template>

<script lang="ts" setup>
import { YModalFooter, YModalHeader } from '@/components/data-display/modal'
import { useBaseProps } from '@/composables'
import { modalDefaultProps } from '@/composables/components'
import { computed } from 'vue'
import { BaseModalProps, YModalSize } from './types'
import { YModalFooterProps, YModalHeaderProps } from './types/YBaseModal.interface'
import { getModalClasses } from './utils/modal-classes'

const props = withDefaults(defineProps<BaseModalProps>(), {
  ...modalDefaultProps,
  size: YModalSize.Medium,
})

const hasFooter = computed(() => props.hasButtonGroupLeft || props.hasButtonGroupRight)

// Classes and styling
const { baseClasses } = useBaseProps(props)

const yModalClasses = computed(() => {
  return [[...baseClasses.value], getModalClasses(props)]
})

// Header and Footer Props
const yModalHeaderProps = computed<YModalHeaderProps>(() => {
  return {
    hasCloseButton: props.hasCloseButton,
    hasHeader: props.hasHeader,
    header: props.header,
    hasVerticalHeader: props.hasVerticalHeader,
  }
})

const yModalFooterProps = computed<YModalFooterProps>(() => {
  return {
    hasButtonGroupLeft: props.hasButtonGroupLeft,
    hasButtonGroupRight: props.hasButtonGroupRight,
    actionBtnText: props.actionBtnText,
    cancelBtnText: props.cancelBtnText,
    leftBtnText: props.leftBtnText,
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/utils';
@import '@/assets/scss/base/animations';

@mixin dialog {
  @include theme-component;
  padding: 0;
  position: fixed;
  z-index: 1001;
  border: component(border);
  background-color: component(bg-color);
}

.y-modal {
  @include dialog;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
}

.y-drawer {
  @include dialog;
  top: 0;
  bottom: 0;
  height: 100svh;
  right: 0;
  width: clamp(260px, 65%, 896px);
  display: flex;
  flex-direction: column;
  transition: transform 0.5s ease;

  .y-modal-content {
    flex-grow: 1;
  }
}

.y-modal-content {
  padding: space(sm) space(md);
}
</style>
