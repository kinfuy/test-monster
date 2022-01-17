<template>
  <div :class="{ 'task-list': true, 'drag-active': dragLaneActive }">
    <div class="task-header">
      <slot name="header">
        <div class="task-title">{{ taskTitle }}</div>
        <div class="task-operate"></div>
      </slot>
    </div>
    <div class="task-content">
      <task-item
        v-for="item in tasks"
        :key="item.id"
        :taskName="item.name"
        :taskTags="item.tags"
        :draggable="true"
        :dragTaskActive="dragTaskActive(item.id)"
        @click="triggerEvent('click', item)"
        @contextmenu="triggerEvent('contextmenu', item)"
        @dblclick="triggerEvent('dblclick', item)"
        @dragstart="onDragStart($event, item.id, { parentId })"
        @dragover="onDragOver($event, item.id, { type: 'task' })"
      >
        <template #task>
          <slot name="taskNode" :task="item"></slot>
        </template>
      </task-item>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, inject, PropType, Ref } from 'vue';
import TaskItem from './TaskItem.vue';
import { Task, TaskLists } from './../type';
import { DragKeyList } from './../hooks/useDrag';
interface DragContent {
  dragKeys: Readonly<Ref<DragKeyList>>;
  onDragStart: (e: DragEvent, key: String, appendParam?: any) => void;
  onDragOver: (e: DragEvent, key: String, appendParam?: any) => void;
}
type triggerEvent = (eventName: 'change' | 'update:data' | 'click' | 'dblclick' | 'contextmenu', data: any) => void;
export default defineComponent({
  name: 'TaskList',
  components: { TaskItem },
  props: {
    parentId: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      default: '',
    },
    tasks: {
      type: Array as PropType<TaskLists>,
      required: true,
    },
    dragLaneActive: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { onDragStart, onDragOver, dragKeys } = inject('dragContent') as DragContent;
    const triggerEvent = inject('triggerEvent') as triggerEvent;
    const dragTaskActive = computed(() => {
      return (key: string) => {
        return (
          dragKeys.value.dragOverKey === key &&
          dragKeys.value.dragOverParams.type === 'task' &&
          dragKeys.value.dragOverKey !== dragKeys.value.dragStartKey
        );
      };
    });
    return {
      onDragStart,
      onDragOver,
      dragTaskActive,
      triggerEvent,
    };
  },
});
</script>
<style lang="less" scoped>
.task-list {
  position: relative;
  width: 300px;
  flex-shrink: 0;
  height: 100%;
  box-shadow: 0 0 10px #f4f4f4;
  border: 1px solid #ccc;
  box-sizing: border-box;
  &.drag-active {
    border: 1px solid rgb(241, 140, 7);
  }
  .task-header {
    position: absolute;
    top: 0;
    padding: 0 10px;
    height: 50px;
    width: 100%;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
  }
  .task-content {
    height: calc(100% - 50px);
    overflow-y: auto;
    margin-top: 50px;
  }
  .task-content {
    padding: 0 10px;
  }
  & + .task-list {
    margin-left: 15px;
  }
}
</style>
