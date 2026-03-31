<template>
  <div class="page-wrapper">
    <el-page-header
      @back="$router.push('/')"
      content="數據概覽頁面"
      style="margin-bottom: 20px"
    />
    <div class="summary-container">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="card in statCards"
          :key="card.title"
        >
          <el-card
            shadow="hover"
            :body-style="{ padding: '20px' }"
          >
            <div class="card-content">
              <el-icon
                :size="40"
                :style="{ color: card.color }"
                ><component :is="card.icon"
              /></el-icon>
              <div class="stat-info">
                <div class="title">{{ card.title }}</div>
                <div class="count">{{ card.count }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        style="margin-top: 20px"
      >
        <el-col :span="12">
          <el-card header="表單類型佔比">
            <div
              ref="pieChartRef"
              style="height: 350px"
            ></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card header="最近提交趨勢">
            <div
              ref="lineChartRef"
              style="height: 350px"
            ></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import { useHistoryStore } from "../../stores/history";
import * as echarts from "echarts";
import { User, Setting, Monitor, ChatLineRound } from "@element-plus/icons-vue";
const historyStore = useHistoryStore();
const pieChartRef = ref(null);
const lineChartRef = ref(null);
// 計算各類型數量
const stats = computed(() => {
  const list = historyStore.historyList;
  return {
    user: list.filter((i) => i.type === "user").length,
    system: list.filter((i) => i.type === "system").length,
    device: list.filter((i) => i.type === "device").length,
    survey: list.filter((i) => i.type === "survey").length,
  };
});
const statCards = computed(() => [
  { title: "用戶註冊", count: stats.value.user, icon: User, color: "#409EFF" },
  {
    title: "系統異常",
    count: stats.value.system,
    icon: Setting,
    color: "#67C23A",
  },
  {
    title: "設備報修",
    count: stats.value.device,
    icon: Monitor,
    color: "#E6A23C",
  },
  {
    title: "問卷回饋",
    count: stats.value.survey,
    icon: ChatLineRound,
    color: "#F56C6C",
  },
]);
onMounted(async () => {
  // 使用 nextTick 確保 Element Plus 組件的佈局已經完全撐開
  await nextTick();
  // 初始化圓餅圖
  const pieChart = echarts.init(pieChartRef.value);
  pieChart.setOption({
    tooltip: { trigger: "item" },
    series: [
      {
        type: "pie",
        radius: "70%",
        data: [
          { value: stats.value.user, name: "用戶" },
          { value: stats.value.system, name: "系統" },
          { value: stats.value.device, name: "設備" },
          { value: stats.value.survey, name: "問卷" },
        ],
      },
    ],
  });
  // 初始化折線圖
  const lineChart = echarts.init(lineChartRef.value);
  lineChart.setOption({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: { type: "value" },
    series: [
      { data: [12, 19, 15, 22, 30, 10, 15], type: "line", smooth: true },
    ],
  });
  // 重要：強制觸獲一次 resize，確保圖表填滿容器
  setTimeout(() => {
    pieChart.resize();
    lineChart.resize();
  }, 100);
  // 監聽視窗縮放，否則圖表不會隨頁面大小變動
  window.addEventListener("resize", () => {
    pieChart.resize();
    lineChart.resize();
  });
});
</script>
