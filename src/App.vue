<script setup lang="ts">
import { PieChart } from "@element-plus/icons-vue";
</script>

<template>
  <div class="common-layout">
    <header class="nav-header">
      <div class="nav-container">
        <div class="brand">
          <span class="brand-name">VUE ADMIN</span>
        </div>

        <el-menu
          :default-active="$route.path"
          class="custom-menu"
          mode="horizontal"
          router
          :ellipsis="false"
          background-color="transparent"
          text-color="rgba(255,255,255,0.85)"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <el-icon><HomeFilled /></el-icon>
            <span>首頁</span>
          </el-menu-item>

          <el-sub-menu index="/forms">
            <template #title><span>表單中心</span></template>
            <el-menu-item index="/forms/user"
              ><el-icon><User /></el-icon>用戶註冊</el-menu-item
            >
            <el-menu-item index="/forms/system"
              ><el-icon><Setting /></el-icon>系統表單</el-menu-item
            >
            <el-menu-item index="/forms/device"
              ><el-icon><Monitor /></el-icon>報修表單</el-menu-item
            >
            <el-menu-item index="/forms/survey"
              ><el-icon><ChatLineRound /></el-icon>問卷調查</el-menu-item
            >
          </el-sub-menu>

          <el-sub-menu index="/analysis">
            <template #title><span>數據報表</span></template>
            <el-menu-item index="/analysis/summary"
              ><el-icon><PieChart /></el-icon>數據概覽</el-menu-item
            >
            <el-menu-item index="/analysis/export"
              ><el-icon><Download /></el-icon>報表導出</el-menu-item
            >
          </el-sub-menu>

          <el-menu-item index="/about">
            <el-icon><Memo /></el-icon>
            <span>系統管理</span>
          </el-menu-item>

          <div class="flex-grow" />
        </el-menu>
      </div>
    </header>

    <el-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <footer
      class="footer"
      style="
        text-align: center;
        padding: 20px;
        background-color: #3a8ee6;
        color: #ffffff;
      "
    >
      <p>© 2026 Vue Element Plus 練習專案</p>
    </footer>
  </div>
</template>

<style>
/* --- 基礎佈局與導覽列 --- */
.nav-header {
  background: linear-gradient(90deg, #409eff 0%, #3a8ee6 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.brand {
  margin-right: 20px;
}

.brand-name {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  white-space: nowrap;
}

.custom-menu {
  border-bottom: none !important;
  flex-grow: 1;
}

.flex-grow {
  flex-grow: 1;
}

/* --- 下拉選單彈窗整體背景 (藍色系) --- */
/* .el-menu--horizontal 是彈窗的頂層類別 */
.el-menu--horizontal .el-menu {
  background-color: #3a8ee6 !important; /* 設置為與導覽列一致的藍色 */
  border: none !important;
  padding: 5px 0;
}

/* --- 下拉選單內的每個選項 --- */
.el-menu--horizontal .el-menu .el-menu-item {
  background-color: transparent !important; /* 背景透明以顯示底層藍色 */
  color: rgba(255, 255, 255, 0.9) !important; /* 文字改為白色 */
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}

/* --- 下拉選項：滑鼠懸停 (Hover) 效果 --- */
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.2) !important; /* 半透明白色高亮 */
  color: #ffffff !important;
}

/* --- 下拉選項：當前選中 (Active) 效果 --- */
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  color: #ffd04b !important; /* 選中時顯示黃色，與你設定的 active-text-color 一致 */
  background-color: rgba(0, 0, 0, 0.1) !important; /* 稍微加深背景色 */
}

/* --- 修正選單的小箭頭顏色 (可選) --- */
.el-menu--horizontal .el-menu .el-popper__arrow::before {
  background-color: #3a8ee6 !important;
  border-color: #3a8ee6 !important;
}
/* --- 導覽列上的文字 (藍底區) --- */
.el-sub-menu__title {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 15px !important;
}

.el-sub-menu__title:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}

.el-menu-item .el-icon,
.el-sub-menu__title .el-icon {
  color: rgb(255, 255, 255) !important;
}

.nav-header .el-menu-item > .el-icon {
  color: white !important;
}

.el-menu--horizontal .el-menu .el-icon {
  color: #000000 !important;
  margin-right: 8px;
}
/* --- 關鍵修正：下拉彈窗內的文字 (白底區) --- */
/* 使用全域選擇器，確保影響到 body 下的彈窗 */
.el-menu--horizontal .el-menu .el-menu-item {
  color: #303133 !important; /* 強制深灰色，解決黃字看不清楚的問題 */
  background-color: #ffffff !important;
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
}

/* 下拉項目滑鼠懸停效果 */
.el-menu--horizontal .el-menu .el-menu-item:hover {
  background-color: #ecf5ff !important; /* 淺藍色背景 */
  color: #409eff !important; /* 藍色文字 */
}

/* 下拉項目被選中時的狀態 */
.el-menu--horizontal .el-menu .el-menu-item.is-active {
  color: #409eff !important;
  background-color: #ecf5ff !important;
  font-weight: bold;
}

/* --- 其他基礎樣式 --- */
body {
  margin: 0;
  background-color: #f0f2f5;
}

.main-content {
  padding: 24px;
}
</style>
