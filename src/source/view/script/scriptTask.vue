<template>
  <div class="script-task">
    <task-board :taskLaneList="taskLaneList" @change="handleChange" @dblclick="handleClick">
      <template #taskLaneHeader="{ taskLane }">
        <div>{{ taskLane.name }}</div>
      </template>
    </task-board>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import TaskBoard from './../../components/TaskBoard';
import { TaskLane } from '../../components/TaskBoard/type';
export default defineComponent({
  name: 'ScriptTask',
  components: { TaskBoard },
  setup() {
    let taskLaneList = ref([
      {
        id: '1',
        name: '进行中',
        tasks: [
          {
            id: '11',
            type: '',
            name: '任务11',
            status: 0,
          },
          {
            id: '12',
            type: '',
            name: '任务12',
            status: 0,
          },
          {
            id: '13',
            type: '',
            name: '任务13',
            status: 0,
          },
        ],
      },
      {
        id: '2',
        name: '已完成',
        tasks: [
          {
            id: '22',
            type: '',
            name: '任务2',
            status: 0,
          },
        ],
      },
      {
        id: '3',
        name: '未开始',
        tasks: [
          {
            id: '33',
            type: '',
            name: '任务3',
            status: 0,
          },
          {
            id: '34',
            type: '',
            name: '任务34',
            status: 0,
          },
        ],
      },
      {
        id: '4',
        name: '已终止',
        tasks: [
          {
            id: '44',
            type: '',
            name: '任务4',
            status: 0,
          },
        ],
      },
    ]);
    const handleChange = (data: any) => {
      taskLaneList.value = data;
    };
    const handleClick = (data: any) => {
      console.log('🔥log=>scriptTask=>86:data:%o', data);
    };
    return {
      handleChange,
      taskLaneList,
      handleClick,
    };
  },
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
