// 引入Vue和相關模組
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import "./assets/all.css";
// 創建應用實例
const app = createApp(App);
// 註冊Element Plus圖標組件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 使用路由、Element Plus、Pinia
app.use(router);
app.use(ElementPlus);
app.use(createPinia());
// 掛載應用
app.mount("#app");
