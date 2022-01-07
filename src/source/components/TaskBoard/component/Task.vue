<template>
  <div class="task" :draggable="true">任务</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Task',
});
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  min-height: 100px;
  background-color: #f4f4f4;
  margin-top: 10px;
  border-radius: 4px;
  border-left: 6px solid #999;
  cursor: pointer;
  & + .task {
    margin-top: 15px;
  }
}
</style>
