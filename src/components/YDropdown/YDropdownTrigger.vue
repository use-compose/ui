<template>
  <div class="y-dropdown-trigger" ref="dropdownTriggerRef">
    <slot>
      <YButton :color="isOpen ? 'primary' : 'secondary'" class="mb-0" @click="toggle">
        Dropdown
      </YButton>
    </slot>
  </div>
</template>

<script lang="ts">
import YButton from '@/components/YButton/YButton.vue'
import { defineComponent, inject } from 'vue'
import { dropdownKey, YDropdownProps, type DropdownKeyInterface } from './YDropdown.types'

export default defineComponent({
  name: 'YDropdownTrigger',
  components: {
    YButton,
  },
  setup(props: YDropdownProps) {
    const { toggle, isOpen, dropdownTriggerRef } = inject(dropdownKey) as DropdownKeyInterface

    return {
      props,
      toggle,
      isOpen,
      dropdownTriggerRef,
    }
  },
})
</script>
