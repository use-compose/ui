<template>
  <div :class="yContainerClasses">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Component, computed } from 'vue'
import './YContainer.scss'

interface ContainerProps {
  component?: Component | keyof HTMLElementTagNameMap
  fluid?: boolean
}

const props = withDefaults(defineProps<ContainerProps>(), {
  component: 'div',
})

const yContainerClasses = computed(() => {
  return ['y-container', props.fluid && 'fluid']
})
</script>
