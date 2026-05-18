<template>
  <YButton type="button" variant="outlined" :class="editorBtnClass" @click="handleClick">
    <slot name="dropdown"></slot>
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </YButton>
</template>

<script setup lang="ts">
import { YButton } from '@use-compose/ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<{ isActive?: boolean }>(), { isActive: false })
const emit = defineEmits<{ click: [event: Event] }>()

const editorBtnClass = computed(() => {
  return {
    active: props.isActive,
  }
})

function handleClick(event: Event) {
  emit('click', event)
}
</script>
