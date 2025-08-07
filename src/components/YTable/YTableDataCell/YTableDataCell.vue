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
import { defineProps, withDefaults } from 'vue'
import type { YTableDataCellProps } from './types'
import './YTableDataCell.scss'

const props = withDefaults(defineProps<YTableDataCellProps>(), {
  header: false, // Default to false, indicating it's a data cell
  colspan: 1, // Default colspan of 1
  rowspan: 1, // Default rowspan of 1
})

const dataCellComponent = props.header ? 'th' : 'td'

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
