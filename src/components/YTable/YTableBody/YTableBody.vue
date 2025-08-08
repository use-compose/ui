<template>
  <tbody class="'y-table-body'">
    <YTableRow v-for="(row, index) in rows" :key="index">
      <slot v-bind="{ row, rowIndex: index }">
        <YTableDataCell v-for="(cell, cellIndex) in rows" :key="cellIndex">
          {{ cell }}
        </YTableDataCell>
      </slot>
    </YTableRow>
  </tbody>
</template>

<script setup lang="ts">
import YTableDataCell from '@/components/YTable/YTableDataCell/YTableDataCell.vue'
import YTableRow from '@/components/YTable/YTableRow/YTableRow.vue'
import { inject } from 'vue'
import { yTableKey, YTableKeyInterface, YTableProps } from '../types'
import './YTableBody.scss'

const props = defineProps<Pick<YTableProps, 'rows'>>()

const { rows } = inject(yTableKey) ? (inject(yTableKey) as YTableKeyInterface) : props

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
