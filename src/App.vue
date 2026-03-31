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
            <el-menu-item index="/forms/user">
              <el-icon><User /></el-icon>用戶註冊
            </el-menu-item>
            <el-menu-item index="/forms/system">
              <el-icon><Setting /></el-icon>系統表單
            </el-menu-item>
            <el-menu-item index="/forms/device">
              <el-icon><Monitor /></el-icon>報修表單
            </el-menu-item>
            <el-menu-item index="/forms/survey">
              <el-icon><ChatLineRound /></el-icon>問卷調查
            </el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="/analysis">
            <template #title><span>數據報表</span></template>
            <el-menu-item index="/analysis/summary">
              <el-icon><PieChart /></el-icon>數據概覽
            </el-menu-item>
            <el-menu-item index="/analysis/export">
              <el-icon><Download /></el-icon>報表導出
            </el-menu-item>
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
      <router-view v-slot="{ Component, route }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component
            :is="Component"
            :key="route.fullPath"
          />
        </transition>
      </router-view>
    </el-main>

    <footer class="footer">
      <p>© 2026 Vue Element Plus 練習專案</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useHistoryStore } from "./stores/history";

import {
  HomeFilled,
  User,
  Setting,
  Monitor,
  ChatLineRound,
  PieChart,
  Download,
  Memo,
} from "@element-plus/icons-vue";

const route = useRoute();
const historyStore = useHistoryStore();

onMounted(() => {
  historyStore.initHistory();
});

watch(
  () => route.path,
  () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
