<template>
  <div aria-modal="true" role="dialog" tabindex="-1" :class="yModalClasses">
    <YModalHeader v-if="hasHeader" v-bind="props">
      <template #default>
        <slot name="header" />
      </template>
    </YModalHeader>

    <section v-if="slots.default || mainSlot" class="y-modal-content">
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

    <YModalFooter v-if="hasFooter" v-bind="props">
      <template #default>
        <slot name="footer" />
      </template>
    </YModalFooter>
  </div>
</template>

<script lang="ts" setup>
import { YModalFooter, YModalHeader } from '@/components/overlays/YModal'
import { modalDefaultProps } from '@/composables/components'
import { computed, useSlots } from 'vue'
import { BaseModalProps, YModalSize } from './types'
import { getModalClasses } from './utils/modal-classes'
import './YModal.scss'

const props = withDefaults(defineProps<BaseModalProps>(), {
  ...modalDefaultProps,
  size: YModalSize.Medium,
})

const yModalClasses = computed(() => {
  return getModalClasses(props)
})

const slots = useSlots()
</script>

<style lang="scss">
// @mixin dialog {
//   // @include theme-component;
//   padding: 0;
//   position: fixed;
//   z-index: 1001;
//   border: 4px solid color(main-dark);
//   @include component(border-width, 4px);
//   background-color: color(main-dark);
//   background-color: color(bg);
//   display: flex;
//   flex-direction: column;
// }

// .y-modal {
//   @include dialog;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   max-width: 100%;
//   max-height: calc(100svh - 5%);
// }

// .y-drawer {
//   @include dialog;
//   top: 0;
//   bottom: 0;
//   height: 100svh;
//   right: 0;
//   width: clamp(260px, 65%, 896px);

//   transition: transform 0.5s ease;

//   .y-modal-content {
//     flex-grow: 1;
//   }
// }
</style>
