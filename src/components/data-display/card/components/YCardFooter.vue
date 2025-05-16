<!-- <template>
  <footer class="y-modal-footer">
    <slot>
      <div class="flex justify-end">
        <YButton v-if="hasAction" @click="handleAction">Save</YButton>
      </div>
    </slot>
  </footer>
</template>
<script setup lang="ts">
import { YButton } from '@/components'
import { YModalFooterProps } from '../../../overlays/modal/types/YBaseModal.interface'

const emit = defineEmits(['action', 'close'])

const props = withDefaults(defineProps<YModalFooterProps>(), {
  hasAction: true,
  action: () => {},
})

function handleAction() {
  if (props.action) {
    props.action()
  }
  emit('close')
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/utils';

.y-modal-footer {
  padding: space(sm) space(md);
}
</style> -->
