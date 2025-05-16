<!-- <template>
  <header class="y-card-header">
    <slot>
      <figure v-if="cover">
        <img :src="cover" alt="cover" />
      </figure>
      <div class="flex justify-between">
        <h4 class="margin-0">{{ header }}</h4>
      </div>
    </slot>
  </header>
</template>
<script setup lang="ts">
export interface CardHeaderProps {
  header?: string
  cover?: string
  hasVerticalHeader: boolean
}

const props = withDefaults(defineProps<CardHeaderProps>(), {
  header: 'Modal Component',
})
</script>
<style lang="scss" scoped>
@import '@/assets/scss/utils';

.y-card-header {
  font-family: gotham;
  text-transform: uppercase;
  padding: space(sm) space(md);
  // border-bottom:;
}
</style> -->
