<template>
  <tfoot>
    <YTableRow>
      <slot>
        <YTableDataCell v-for="(footerCell, index) in props.footer" :key="index">
          {{ footerCell }}
        </YTableDataCell>
      </slot>
    </YTableRow>
  </tfoot>
</template>

<script setup lang="ts">
import YTableRow from '../YTableRow/YTableRow.vue'
import './YTableFooter.scss'
import type { TableFooter } from './YTableFooter.types.ts'

const props = defineProps<{
  footer: TableFooter[]
}>()
</script>
