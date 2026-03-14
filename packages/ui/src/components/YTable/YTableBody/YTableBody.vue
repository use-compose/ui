<template>
  <tbody class="'y-table-body'">
    <template v-if="!props.rows || props.rows.length === 0">
      <YTableRow>
        <YTableDataCell :colspan="colspan">
          <slot name="no-data" />
        </YTableDataCell>
      </YTableRow>
    </template>

    <template v-else>
      <YTableRow v-for="(row, index) in rows" :key="index">
        <slot v-bind="{ row, rowIndex: index }">
          <YTableDataCell v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </YTableDataCell>
        </slot>
      </YTableRow>
    </template>
  </tbody>
</template>

<script setup lang="ts">
import YTableDataCell from '@/components/YTable/YTableDataCell/YTableDataCell.vue'
import YTableRow from '@/components/YTable/YTableRow/YTableRow.vue'
import { computed, inject } from 'vue'
import { yTableKey, YTableKeyInterface, YTableProps } from '../types'

const props = defineProps<Pick<YTableProps, 'rows' | 'headers'>>()

const { rows } = inject(yTableKey) ? (inject(yTableKey) as YTableKeyInterface) : props

const colspan = computed(() => Math.max(1, props.headers?.length || 1))

// const rowValues = computed(() => {
//   if (rows) {
//     return rows.map((row) => {
//       if (typeof row === 'string') {
//         return row
//       } else if (typeof row === 'object' && 'value' in row) {
//         return row.value ? row.value : row.key || ''
//       }
//       return row
//     })
//   }
//   return []
// })

// const { varia
</script>
