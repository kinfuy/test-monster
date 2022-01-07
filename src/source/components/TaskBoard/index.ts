import { App } from 'vue';
import TaskBoard from './TaskBoard.vue';
TaskBoard.install = (app: App) => {
  app.component('TaskBoard', TaskBoard);
};
export default TaskBoard;
