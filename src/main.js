import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // 匯入路由
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(router); // 啟用路由
app.use(ElementPlus);
app.mount("#app");
