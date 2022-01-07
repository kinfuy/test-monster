<template>
  <div class="task-list">
    <div class="task-header">
      <div class="task-title">{{ taskTitle }}</div>
      <div class="task-operate"></div>
    </div>
    <div class="task-content">
      <Task />
      <Task />
    </div>
    <div class="task-footer"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Task from './Task.vue';
export default defineComponent({
  name: 'TaskList',
  components: { Task },
  props: {
    taskTitle: {
      type: String,
      default: '',
    },
  },
});
</script>
<style lang="less" scoped>
.task-list {
  width: 300px;
  flex-shrink: 0;
  height: 100%;
  box-shadow: 0 0 10px #f4f4f4;
  border: 1px solid #ccc;
  overflow-y: auto;
  .task-header {
    padding: 0 10px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .task-content {
    padding: 0 10px;
  }
  & + .task-list {
    margin-left: 15px;
  }
}
</style>
