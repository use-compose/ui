<template>
  <header class="y-modal-header">
    <slot>
      <div class="flex justify-space-between">
        <h2 class="margin-0">{{ header }}</h2>
        <CloseIcon
          v-if="props.hasCloseButton"
          @click="emit('close')"
          class="cursor-pointer align-self-start"
          :width="48"
        />
      </div>
    </slot>
  </header>
</template>
<script setup lang="ts">
import { CloseIcon } from '@/components/icons'

export interface BaseModalHeaderProps {
  hasCloseButton: boolean
  hasHeader: boolean
  header?: string
  hasVerticalHeader: boolean
}

const emit = defineEmits(['close'])

const props = withDefaults(defineProps<BaseModalHeaderProps>(), {
  hasCloseButton: true,
  header: 'Modal Component',
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/utils';

.y-modal-header {
  font-family: gotham;
  text-transform: uppercase;
  padding: space(sm) space(md);
  // border-bottom:;
}
</style>
