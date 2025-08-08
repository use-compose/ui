<template>
  <table :class="getClasses">
    <YTableHeader>
      <template #default="{ headerValues }">
        <slot name="header" v-bind="{ headerValues }" />
      </template>
    </YTableHeader>

    <YTableBody>
      <template #default="{ row }">
        <slot name="body" v-bind="{ row }" />
      </template>
    </YTableBody>

    <YTableFooter v-if="$slots.footer" :footer="props.footer">
      <template #default>
        <slot name="footer" />
      </template>
    </YTableFooter>
  </table>
</template>

<script setup lang="ts">
import { computed, defineProps, provide } from 'vue'
import { yTableKey, type YTableProps } from './types'
import './YTable.scss'
import YTableBody from './YTableBody/YTableBody.vue'
import YTableFooter from './YTableFooter/YTableFooter.vue'
import YTableHeader from './YTableHeader/YTableHeader.vue'

const props = withDefaults(defineProps<YTableProps>(), {
  headers: () => [],
  rows: () => [],
  footer: () => [],
})

provide(yTableKey, props)

const getClasses = computed(() => {
  return ['y-table']
})
</script>
