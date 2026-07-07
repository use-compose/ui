<!-- <template>
      <YStack
        justify="flex-start"
        align="flex-start"
        gap="--space-xs"
        class="y-menu w-full primary base"
        :style="getStyles"
        as="ul"
      >
        <slot></slot>
      </YStack>
    </template> -->

<script lang="ts">
import { computed, defineComponent, Fragment, h, useSlots, VNode } from 'vue'
import YStack, { type YStackProps } from '../cube/YStack/YStack.vue'
import './YMenu.css'

export interface YMenuProps extends YStackProps {
  zIndex?: number | string
  dense?: boolean
  as?: string
}

type NodeToFlatten = VNode

export default defineComponent({
  name: 'YMenu',
  components: {
    YStack,
  },
  props: {
    zIndex: {
      type: [Number, String],
      default: 900,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    as: {
      type: String,
      default: 'ul',
    },
  },
  setup(props: YMenuProps) {
    function flattenVNodes(vnodes: VNode[]): VNode[] {
      return vnodes.flatMap((vnode) =>
        vnode.type === Fragment ? flattenVNodes(vnode.children ?? []) : [vnode],
      )
    }

    const getStyles = computed(() => {
      return {
        zIndex: props.zIndex,
      }
    })

    const slots = useSlots()

    return () =>
      h(
        YStack,
        { class: props.as, as: props.as, style: getStyles.value },
        {
          default: () =>
            flattenVNodes(slots.default?.() ?? []).map((vnode) => h('li', {}, [vnode])),
        },
      )
  },
})

// const props = withDefaults(defineProps<YMenuProps>(), {
//   zIndex: 900,
//   dense: false,
//   as: 'ul',
// })
</script>
