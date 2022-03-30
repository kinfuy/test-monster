import { createApp } from 'vue';
import App from './App.vue';
import router from './router/popup';
import ElementPlus from 'element-plus';
import 'style-loader!css-loader!element-plus/dist/index.css';
const app = createApp(App);
app.use(ElementPlus);
app.use(router).mount('#app');
