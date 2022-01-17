export interface Task {
  id: string;
  type: string;
  name: string;
  status: number;
  tags?: Array<string>;
}

/** 任务泳道 */
export interface TaskLane {
  id: string;
  name: string;
  tasks: Array<Task>;
}
export type TaskLaneList = Array<TaskLane>;
export type TaskLists = Array<Task>;

export interface TaskBoardProps {
  taskList: TaskLaneList;
}
export interface TaskListProps {
  width: number;
  dragabled: boolean;
}

export interface TaskProps {
  extend: boolean;
  dragabled: boolean;
}
