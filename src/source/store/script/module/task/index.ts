interface TaskStore {
  taskList: Array<Task>;
}
interface Task {
  id: string;
  preCondition: any; // 前置条件
  relationScripts: Array<String>; // 关联脚本，执行顺序按数组id顺序
  verifyResult: VerifyResult; // 执行结果验证
  verifyState: boolean; // 验证状态
  loop: number; // 任务循环次数
  runTime: Date;
  intervalTime: string;
  taskName: string;
  createTime: Date;
  updateTime: Date;
  taskState: number;
}
interface Condition {
  openUrl: string; // 打开网页
}
interface VerifyResult {
  screenShot: boolean; // 是否截屏
}
