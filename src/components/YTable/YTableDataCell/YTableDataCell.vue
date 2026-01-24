<template>
  <Component
    :is="dataCellComponent"
    :header="props.header"
    class="y-table-data-cell"
    :colspan="props.colspan"
    :rowspan="props.rowspan"
  >
    <slot>
      <p>{{ dataCellComponent === 'th' ? 'Header Cell' : 'Data Cell' }}</p>
    </slot>
  </Component>
</template>

<script setup lang="ts">
import { computed, defineProps, withDefaults } from 'vue'
import type { YTableDataCellProps } from './types'
import './YTableDataCell.css'

const props = withDefaults(defineProps<YTableDataCellProps>(), {
  header: false,
  colspan: 1,
  rowspan: 1,
})

const dataCellComponent = computed(() => (props.header ? 'th' : 'td'))
</script>
