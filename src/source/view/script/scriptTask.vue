<template>
  <div class="script-task">
    <task-board></task-board>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TaskBoard from './../../components/TaskBoard';
export default defineComponent({
  name: 'ScriptTask',
  components: { TaskBoard },
});
</script>
<style lang="less" scoped>
.script-task {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0 30px;
  padding-bottom: 50px;
}
</style>
