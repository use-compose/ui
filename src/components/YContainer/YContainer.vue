<template>
  <div :class="yContainerClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import './YContainer.scss'

interface ContainerProps {
  fluid?: boolean
}

const props = withDefaults(defineProps<ContainerProps>(), {})

const yContainerClasses = computed(() => {
  return ['y-container', props.fluid && 'fluid']
})
</script>
