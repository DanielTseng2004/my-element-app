# My Element App

一個基於 Vue 3 + Vite + Element Plus 的現代化前端練習專案。

---

## 目錄

- [My Element App](#my-element-app)
  - [目錄](#目錄)
  - [專案簡介](#專案簡介)
    - [目前專案結構：](#目前專案結構)
  - [開始使用](#開始使用)
  - [可用指令](#可用指令)
  - [Element Plus（UI 套件）](#element-plusui-套件)
  - [內容說明](#內容說明)
  - [自訂與擴充](#自訂與擴充)
  - [開發建議](#開發建議)

---

## 專案簡介

這是一個使用 Vue 3 + Vite + Element Plus 建立的練習專案，包含多個視圖頁面與基本元件互動。目標是學習 Vue Router、表單綁定、狀態管理思路與模擬資料 (Mock data)。

### 目前專案結構：

- `src/main.js`：入口，掛載 Vue 應用。
- `src/App.vue`：根組件。
- `src/router/index.js`：路由設定。
- `src/views/`：各頁面視圖，包括 `HomeView.vue`, `AboutView.vue`, `FormView.vue`, `DeviceFormView.vue`, `SysFormView.vue`, `Survey.vue`。
- `src/mock/data.js`：模擬資料來源。
- `src/style.css`：全域 CSS。

---

## 開始使用

1. 安裝依賴：

   ```bash
   npm install
   ```

2. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

3. 打開瀏覽器：

   默認網址 `http://localhost:5173`。

---

## 可用指令

- `npm run dev`：啟動開發模式 (熱重載)
- `npm run build`：打包生產檔案
- `npm run serve`：本地預覽生產環境包（如已安裝 `vite` 插件支援）

---

## Element Plus（UI 套件）

本專案搭配 Element Plus，快速建置企業級 UI 元件。以下示範安裝與設定：

1. 安裝 Element Plus

   ```bash
   npm install element-plus
   npm install @element-plus/icons-vue
   ```

2. 在 `src/main.js` 中引入並註冊（同時引入樣式）

   ```js
   import { createApp } from "vue";
   import App from "./App.vue";
   import router from "./router";
   import ElementPlus from "element-plus";
   import "element-plus/dist/index.css";
   import * as ElementPlusIconsVue from "@element-plus/icons-vue";

   const app = createApp(App);

   for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
     app.component(key, component);
   }

   app.use(router);
   app.use(ElementPlus);
   app.mount("#app");
   ```

3. 在視圖中使用元件（例如 `FormView.vue`）

   ```vue
   <template>
     <el-form :model="form" label-width="80px">
       <el-form-item label="名稱">
         <el-input v-model="form.name" />
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="submit">提交</el-button>
       </el-form-item>
     </el-form>
   </template>

   <script setup>
   import { ref } from 'vue'

   const form = ref({ name: '' })
   const submit = () => {
     console.log('submit', form.value)
   }
   </script>
   ```

4. 可選：按需引入（節省打包體積）

   參考官方 `unplugin-vue-components` + `unplugin-auto-import` 設定。

---

## 內容說明

- 表單範例：`FormView.vue`, `DeviceFormView.vue`, `SysFormView.vue` 可以練習 `v-model`、事件處理、表單驗證與提交。
- 調查問卷：`Survey.vue` 可能示範多選或單選項目，使用組件重用方式。
- 路由導向：`router/index.js` 定義各頁面路由，搭配 `<router-link>` 與 `<router-view>` 實現 SPA 導航。
- 模擬資料：`src/mock/data.js` 用來提供 mock JSON (例如清單資料) 測試 UI 資料綁定。

---

## 自訂與擴充

- 新增組件：可在 `src/components/` 新增 `.vue` 檔並引入 `App.vue` 或各個視圖。
- 全域狀態：若需要更複雜的狀態管理，可加入 Pinia 或 Vuex。
- API 整合：將 `src/mock/data.js` 換成真實後端 API 呼叫，使用 `fetch` 或 Axios。

---

## 開發建議

1. 先熟悉 `src/router/index.js` 的路由設定。
2. 在 `src/views/*` 里補充表單驗證、錯誤提示與提交流程。
3. 使用 Vue Devtools 進行狀態與路由檢視。

---

> 此專案適合 Vue 初學者練習基本概念與 UI 整合。
