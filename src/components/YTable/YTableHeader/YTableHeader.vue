<template>
  <thead>
    <YTableRow>
      <slot>
        <YTableDataCell v-for="(header, index) in headers" :key="index" type="header">
          {{ header }}
        </YTableDataCell>
      </slot>
    </YTableRow>
  </thead>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { yTableKey, YTableKeyInterface } from '../types'
import YTableDataCell from '../YTableDataCell/YTableDataCell.vue'
import YTableRow from '../YTableRow/YTableRow.vue'
import './YTableHeader.scss'

// const props = defineProps<TableHeaders>()
const { headers } = inject(yTableKey) ? (inject(yTableKey) as YTableKeyInterface) : { headers: [] }
// console.log('YTableHeader props:', props)
// const { headers } = props

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
