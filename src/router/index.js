import { createRouter, createWebHistory } from "vue-router";
// src/router/index.js 裡面的 import 部分
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import SysFormView from "../views/SysFormView.vue";
import AboutView from "../views/AboutView.vue";
import DeviceFormView from "../views/DeviceFormView.vue";
import Survey from "../views/Survey.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/form",
    name: "form",
    component: FormView,
  },
  {
    path: "/sysform",
    name: "sysform",
    component: SysFormView,
  },
  {
    path: "/device",
    name: "device",
    component: DeviceFormView,
  },
  {
    path: "/survey",
    name: "survey",
    component: Survey,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
