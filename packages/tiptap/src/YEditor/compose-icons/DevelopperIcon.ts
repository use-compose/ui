import { defineComponent, h } from 'vue';
import { useComposeIcon } from 'nuxt-compose-icons/composables';
import type { ComposeIconProps } from 'nuxt-compose-icons/types';

export default defineComponent({
  name: 'DevelopperIcon',
  props: {
    color: String,
    stroke: String,
    strokeWidth: [String, Number],
    fill: String,
    size: {
      type: String,
      default: 'md'
    }
  },
  setup(props: ComposeIconProps) {
    const { buildSvgAttributes } = useComposeIcon(props);
    const svgAttributes = {
  "width": 42,
  "height": 41,
  "fill": "none",
  "class": "compose-icon",
  "viewBox": "0 0 42 41"
};

    return () => h('svg', buildSvgAttributes(svgAttributes), [
      h('path', {
  "stroke": "var(--icon-stroke, #000)",
  "stroke-linecap": "round",
  "stroke-width": "var(--icon-stroke-width, 3)",
  "d": "M28.5 39H39.5M39.5 39V28M13.5 2H2.5M2.5 2V13"
}, [])
    ]);
  }
});
 