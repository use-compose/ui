<template>
  <div data-compose-ui aria-modal="true" role="dialog" tabindex="-1" :class="yModalClasses">
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
import { YModalFooter, YModalHeader } from '@/components/YModal'
import { modalDefaultProps } from '@/composables/components'
import { computed, useSlots } from 'vue'
import { BaseModalProps, YModalSize } from './types'
import { getModalClasses } from './utils/modal-classes'
import './YModal.css'

const props = withDefaults(defineProps<BaseModalProps>(), {
  ...modalDefaultProps,
  size: YModalSize.Medium,
})

const yModalClasses = computed(() => {
  return getModalClasses(props)
})

const slots = useSlots()
</script>
