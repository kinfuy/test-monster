import 'babel-polyfill';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/script';
import ElementPlus from 'element-plus';
import 'style-loader!css-loader!element-plus/dist/index.css';
import './assets/icons/iconfont.js';
import CommonDirective from './directive';

const app = createApp(App);
app.use(ElementPlus);
app.use(CommonDirective);
app.use(router).mount('#script-app');
