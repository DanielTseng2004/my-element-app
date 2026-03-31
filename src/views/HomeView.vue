<template>
  <!-- 頁面包裝器 -->
  <div class="page-wrapper">
    <div class="home-wrapper">
      <!-- 歡迎區域 -->
      <div class="welcome-section">
        <h1>{{ welcomeText }}，管理員</h1>
        <p>今天是 {{ currentDate }}，系統運行正常。</p>
      </div>
      <!-- 統計行 -->
      <el-row
        :gutter="20"
        class="stat-row"
      >
        <el-col
          :span="6"
          v-for="item in quickStats"
          :key="item.label"
        >
          <el-card
            shadow="hover"
            class="stat-mini-card"
          >
            <div
              class="stat-value"
              :style="{ color: item.color }"
            >
              {{ item.value }}
            </div>
            <div class="stat-label">{{ item.label }}</div>
          </el-card>
        </el-col>
      </el-row>
      <!-- 功能菜單網格 -->
      <div class="menu-grid">
        <el-row :gutter="25">
          <el-col
            :xs="12"
            :sm="8"
            :md="6"
            v-for="link in menuLinks"
            :key="link.path"
          >
            <el-card
              class="menu-card"
              shadow="hover"
              @click="$router.push(link.path)"
            >
              <div
                class="icon-box"
                :style="{ backgroundColor: link.bg }"
              >
                <el-icon
                  :size="30"
                  color="#fff"
                  ><component :is="link.icon"
                /></el-icon>
              </div>
              <h3>{{ link.title }}</h3>
              <p>{{ link.desc }}</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
// 引入依賴
import { computed } from "vue";
import { useHistoryStore } from "../stores/history";
import {
  User,
  Setting,
  Monitor,
  Document,
  PieChart,
  List,
} from "@element-plus/icons-vue";
// 使用store
const historyStore = useHistoryStore();
// 計算屬性：歡迎文字
const welcomeText = computed(() => {
  const hour = new Date().getHours();
  return hour < 12 ? "早安" : hour < 18 ? "午安" : "晚安";
});
// 當前日期
const currentDate = new Date().toLocaleDateString();
// 簡單統計
const quickStats = computed(() => [
  {
    label: "總提交數",
    value: historyStore.historyList.length,
    color: "#409eff",
  },
  {
    label: "待處理案件",
    value: historyStore.historyList.filter((i) => i.status === "pending")
      .length,
    color: "#e6a23c",
  },
  { label: "今日新增", value: 0, color: "#67c23a" }, // 可根據 createTime 加強邏輯
  {
    label: "系統異常",
    value: historyStore.historyList.filter((i) => i.type === "system").length,
    color: "#f56c6c",
  },
]);
// 功能入口
const menuLinks = [
  {
    title: "用戶註冊",
    desc: "新增人員基本資料",
    path: "/forms/user",
    icon: User,
    bg: "#409eff",
  },
  {
    title: "系統表單",
    desc: "回報軟體運行錯誤",
    path: "/forms/system",
    icon: Setting,
    bg: "#67c23a",
  },
  {
    title: "設備報修",
    desc: "硬體故障申請維護",
    path: "/forms/device",
    icon: Monitor,
    bg: "#e6a23c",
  },
  {
    title: "問卷調查",
    desc: "收集用戶滿意度",
    path: "/forms/survey",
    icon: Document,
    bg: "#f56c6c",
  },
  {
    title: "數據分析",
    desc: "視覺化統計報表",
    path: "/analysis/summary",
    icon: PieChart,
    bg: "#909399",
  },
  {
    title: "管理中心",
    desc: "歷史紀錄審核管理",
    path: "/about",
    icon: List,
    bg: "#303133",
  },
];
</script>
