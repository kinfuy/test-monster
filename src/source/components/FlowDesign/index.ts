import { App } from 'vue';
import FlowDesign from './FlowDesign.vue';
FlowDesign.install = (app: App) => {
  app.component('FlowDesign', FlowDesign);
};
export default FlowDesign;
