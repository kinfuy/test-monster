interface TaskStore {
  taskList: Array<TaskFlow>;
}
interface BaseTask {
  taskId: string;
}
interface DelayTask extends BaseTask {
  type: 'delay';
  elayTime: number;
}
interface RunScriptTask extends BaseTask {
  type: 'run_script';
  relationScriptId: String;
}
interface OpenUrlTask extends BaseTask {
  type: 'open_url';
  openUrl: string;
}
interface ShotCutTask extends BaseTask {
  type: 'shot_cut';
  download?: string;
}

type Task = DelayTask | RunScriptTask | OpenUrlTask | ShotCutTask;
interface TaskFlow {
  id: string;
  task: Array<Task>;
  loop: number; // 任务循环次数
  runTime: Date;
  intervalTime: string;
  taskName: string;
  createTime: Date;
  lastRunTime: Date; // 上次执行时间
  runCount: number; // 执行次数统计
  updateTime: Date;
  taskState: number;
}

import { Ref, ref } from 'vue';
export const taskStore: Ref<TaskStore> = ref({
  taskList: [],
});
