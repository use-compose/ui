<template>
  <div ref="rtDropdownTriggerRef">
    <slot>
      <RtButton :variant="isOpen ? 'primary' : 'secondary'" tone="neutral" class="rt-w-full" @click="toggle">
        Dropdown
      </RtButton>
    </slot>
  </div>
</template>

<script lang="ts">
import RtButton from '@/components/RtButton/RtButton.vue'
import { defineComponent, inject } from 'vue'
import { rtDropdownKey, RtDropdownTriggerProps, type RtDropdownKeyInterface } from './types'

export default defineComponent({
  name: 'RtDropdownTrigger',
  components: {
    RtButton // Assuming RtButton is used in the default slot
  },
  setup(props: RtDropdownTriggerProps) {
    const { toggle, isOpen, rtDropdownTriggerRef } = inject(rtDropdownKey) as RtDropdownKeyInterface

    return {
      props,
      toggle,
      isOpen,
      rtDropdownTriggerRef
    }
  }
})
</script>
