import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import mitt from 'mitt'

import "./assets/main.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus,{ locale: zhCn})
// vue3.x的全局实例，要挂载在config.globalProperties上
app.config.globalProperties.$EventBus = new mitt()

app.mount("#app");
