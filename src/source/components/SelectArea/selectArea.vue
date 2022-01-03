<template>
  <div
    id="select-area"
    class="select-area"
    :style="[{ width: size.width + 'px' }, { height: size.height + 'px' }, { top: Point.y + 'px' }, { left: Point.x + 'px' }]"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Point } from './selectArea.type';
export default defineComponent({
  name: 'SelectArea',
  props: {
    startPoint: {
      type: Object as PropType<Point>,
      required: true,
    },
    endPoint: {
      type: Object as PropType<Point>,
      required: true,
    },
  },
  setup(props) {
    let Point = computed(() => {
      let x = props.endPoint.x === 0 ? props.startPoint.x : Math.min(props.startPoint.x, props.endPoint.x);
      let y = props.endPoint.y === 0 ? props.startPoint.y : Math.min(props.startPoint.y, props.endPoint.y);
      return {
        x,
        y,
      };
    });
    let size = computed(() => {
      let width = props.endPoint.x === 0 ? 0 : Math.abs(props.startPoint.x - props.endPoint.x);
      let height = props.endPoint.y === 0 ? 0 : Math.abs(props.startPoint.y - props.endPoint.y);
      return {
        width,
        height,
      };
    });
    return {
      Point,
      size,
    };
  },
});
</script>
<style lang="less" scoped>
.select-area {
  position: fixed;
  background-color: rgba(255, 192, 203, 0.1);
  border: 1px solid #ee68b2;
  z-index: 9;
}
</style>
