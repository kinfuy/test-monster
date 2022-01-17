<template>
  <div :class="['task-warper', { 'drag-active': dragTaskActive }]">
    <slot name="task">
      <div class="task-item">
        {{ taskName }}
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TaskItem',
  props: {
    taskName: {
      type: String,
      default: '',
    },
    taskType: {
      type: String,
      default: '',
    },
    taskTags: {
      type: Array,
      default: [],
    },
    dragTaskActive: {
      type: Boolean,
      default: false,
    },
  },
  setup() {},
});
</script>
<style lang="less" scoped>
.task-warper {
  position: relative;
  &.drag-active::before {
    position: absolute;
    top: -5px;
    content: '';
    height: 4px;
    width: 100%;
    background-color: rgb(241, 140, 7);
  }
  .task-item {
    width: 100%;
    background-color: #f5f7fa;
    margin-top: 10px;
    min-height: 100px;
    border-radius: 4px;
    border-left: 6px solid #999;
    cursor: pointer;

    & + .task {
      margin-top: 15px;
    }
    &:last-child {
      margin-bottom: 15px;
    }
  }
}
</style>
