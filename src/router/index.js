import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FormView from "../views/FormViews/FormView.vue";
import SysFormView from "../views/FormViews/SysFormView.vue";
import AboutView from "../views/AboutView.vue";
import DeviceFormView from "../views/FormViews/DeviceFormView.vue";
import Survey from "../views/FormViews/Survey.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/forms",
    name: "form-center",
    children: [
      { path: "user", name: "form-user", component: FormView },
      { path: "system", name: "form-system", component: SysFormView },
      { path: "device", name: "form-device", component: DeviceFormView },
      { path: "survey", name: "form-survey", component: Survey },
    ],
  },
  {
    path: "/analysis",
    name: "analysis-center",
    children: [
      {
        path: "summary",
        name: "summary",
        component: () => import("../views/Analysis/Summary.vue"),
      },
      {
        path: "export",
        name: "export",
        component: () => import("../views/Analysis/Export.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有按下「回上一頁」，就回到原本的位置；否則一律捲到頂部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" }; // behavior: 'smooth' 會有一點平滑滾動感
    }
  },
});
export default router;
