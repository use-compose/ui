<template>
  <tbody :class="['y-table-body']">
    <YTableRow v-for="(row, index) in rows" :key="index">
      <slot v-bind="{ row }">
        <YTableDataCell v-for="(cell, cellIndex) in row" :key="cellIndex">
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
import { yTableKey, YTableKeyInterface } from '../types'
import './YTableBody.scss'

// const props = defineProps<YTableRows>()

const { rows } = inject(yTableKey) ? (inject(yTableKey) as YTableKeyInterface) : { rows: [] }

// const { variantClass } = useVariant(props)
// const { stateClass, isDisabled } = useState(props)
// const { colorClass } = useColor(props)
// const { sizeClass } = useSize(props)
// const { rawClasses } = useRaw(props)

// const getClasses = computed(() => {
//  return [variantClass.value,
//    stateClass.value,
//    colorClass.value,
//    sizeClass.value,
//    rawClasses.value,
//  ]
//})
</script>
