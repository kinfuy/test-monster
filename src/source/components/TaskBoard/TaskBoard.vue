<template>
  <div class="task-board">
    <TaskList task-title="进行中"></TaskList>
    <TaskList task-title="未开始"></TaskList>
    <TaskList task-title="已完成"></TaskList>
    <TaskList task-title="已终止"></TaskList>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskList from './component/TaskList.vue';
export default defineComponent({
  name: 'TaskBoard',
  components: { TaskList },
  props: {
    taskList: {
      type: Array,
      default: [],
    },
  },
});
</script>
<style lang="less" scoped>
.task-board {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
}
</style>
