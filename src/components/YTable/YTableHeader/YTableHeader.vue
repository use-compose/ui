<template>
  <thead>
    <YTableRow>
      <slot v-bind="{ headerValues }">
        <YTableDataCell v-for="(header, index) in headerValues" :key="index" :header="true">
          {{ header }}
        </YTableDataCell>
      </slot>
    </YTableRow>
  </thead>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { yTableKey, YTableKeyInterface, YTableProps } from '../types'
import YTableDataCell from '../YTableDataCell/YTableDataCell.vue'
import YTableRow from '../YTableRow/YTableRow.vue'
import './YTableHeader.scss'

const props = defineProps<Pick<YTableProps, 'headers'>>()
const { headers } = inject(yTableKey) ? (inject(yTableKey) as YTableKeyInterface) : props

const headerValues = computed(() => {
  if (headers) {
    return headers.map((header) => {
      if (typeof header === 'string') {
        return header
      } else if (typeof header === 'object' && 'value' in header) {
        return header.value ? header.value : header.key || ''
      }
      return ''
    })
  }
  return []
})
</script>
