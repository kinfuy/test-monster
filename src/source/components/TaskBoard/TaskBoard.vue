<template>
  <div class="task-board">
    <TaskList
      v-for="item in stateData"
      :key="item.id"
      :task-title="item.name"
      :tasks="item.tasks"
      :parent-id="item.id"
      :drag-lane-active="dragActive(item.id)"
      @dragleave="onDragLeave"
      @dragover="onDragOver($event, item.id, { type: 'taskLane' })"
      @drop="onDrop($event, item.id)"
    >
      <template #header>
        <slot name="taskLaneHeader" :taskLane="item"></slot>
      </template>
      <template #taskNode="{ task }">
        <slot name="taskNode" :task="task"></slot>
      </template>
    </TaskList>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, provide, watch, ref, Ref, computed } from 'vue';
import TaskList from './component/TaskList.vue';
import { useDrag, DragKeyList } from './hooks/useDrag';
import { TaskBoardProps, TaskLaneList, Task } from './type';
import clonedeep from 'lodash.clonedeep';
export default defineComponent({
  name: 'TaskBoard',
  components: { TaskList },
  props: {
    taskLaneList: {
      type: Array as PropType<TaskLaneList>,
      default: [],
    },
  },
  emits: ['change', 'update:data', 'click', 'dblclick', 'contextmenu'],
  setup(props, { emit }) {
    const emitChange = () => {
      const rst = clonedeep(stateData.value);
      emit('update:data', rst);
      emit('change', rst);
    };
    const triggerEvent = (eventName: 'change' | 'update:data' | 'click' | 'dblclick' | 'contextmenu', data: any) => {
      emit(eventName, clonedeep(data));
    };
    const stateData = ref<TaskLaneList>([]);
    watch(
      () => props.taskLaneList,
      (val) => {
        stateData.value = val;
      },
      {
        immediate: true,
      }
    );
    // 删除拖拽任务，并返回
    const deleteTask = (dragLaneKey: string, dragTaskKey: string): Task | undefined => {
      let targetNode: Task | undefined = undefined;
      stateData.value.forEach((x) => {
        if (x.id === dragLaneKey) {
          for (let i = 0; i < x.tasks.length; i++) {
            if (x.tasks[i].id === dragTaskKey) {
              targetNode = clonedeep(x.tasks[i]);
              x.tasks.splice(i, 1);
              i--;
            }
          }
        }
      });
      return targetNode;
    };
    const afterDrop = (e: DragEvent, dragKeys: Readonly<Ref<DragKeyList>>) => {
      if (dragKeys.value.dragStartParams && dragKeys.value.dragStartParams.parentId && dragKeys.value.dragStartKey) {
        const targetNode = deleteTask(dragKeys.value.dragStartParams.parentId, dragKeys.value.dragStartKey);
        const isOrder = dragKeys.value.dragOverParams.type === 'task'; // 拖拽到任务上需要进行排序
        if (targetNode) {
          stateData.value.forEach((x) => {
            if (x.id === dragKeys.value.dragEndKey) {
              if (isOrder) {
                for (let i = 0; i < x.tasks.length; i++) {
                  if (x.tasks[i].id === dragKeys.value.dragOverKey) {
                    x.tasks.splice(i, 0, targetNode);
                    emitChange();
                    return;
                  }
                }
              } else {
                x.tasks.push(targetNode);
                emitChange();
              }
            }
          });
        }
      }
    };
    const { dragKeys, onDragStart, onDragEnd, onDrop, onDragOver, onDragLeave } = useDrag({
      afterDrop,
    });
    const dragActive = computed(() => {
      return (key: string) => {
        return (
          dragKeys.value.dragOverKey === key &&
          dragKeys.value.dragOverParams.type === 'taskLane' &&
          dragKeys.value.dragOverKey !== dragKeys.value.dragStartParams.parentId
        );
      };
    });
    provide('dragContent', { onDragStart, onDragOver, onDragEnd, dragKeys });
    provide('triggerEvent', triggerEvent);

    return {
      stateData,
      onDrop,
      onDragOver,
      onDragLeave,
      dragKeys,
      dragActive,
    };
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
