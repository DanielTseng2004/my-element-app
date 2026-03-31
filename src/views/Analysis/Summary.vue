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
import { useRoute, useRouter } from "vue-router";
import { useHistoryStore } from "../../stores/history";
import * as echarts from "echarts";
import { User, Setting, Monitor, ChatLineRound } from "@element-plus/icons-vue";
const historyStore = useHistoryStore();
const route = useRoute();
const router = useRouter();

// 直接跳轉時自動刷新一次（避免路由切換後圖表渲染異常）
if (route.query._reloaded !== "1") {
  router.replace({
    path: route.path,
    query: { ...route.query, _reloaded: "1" },
  });
  window.location.reload();
}

const pieChartRef = ref(null);
const lineChartRef = ref(null);
// 計算各類型數量
const stats = computed(() => {
  return {
    user: historyStore.historyList.filter((i) => i.type === "user").length,
    system: historyStore.historyList.filter((i) => i.type === "system").length,
    device: historyStore.historyList.filter((i) => i.type === "device").length,
    survey: historyStore.historyList.filter((i) => i.type === "survey").length,
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
let pieChart, lineChart;

const resizeCharts = () => {
  pieChart?.resize();
  lineChart?.resize();
};

onMounted(async () => {
  // 使用 nextTick 確保 Element Plus 組件的佈局已經完全撐開
  await nextTick();
  // 初始化圓餅圖
  pieChart = echarts.init(pieChartRef.value);
  // 初始化折線圖
  lineChart = echarts.init(lineChartRef.value);
  // ... setOption ...

  resizeCharts();
  window.addEventListener("resize", resizeCharts);

  // 如果剛進來 chart 容器尚未定義，延遲一次保險
  setTimeout(resizeCharts, 300);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCharts);
  pieChart?.dispose();
  lineChart?.dispose();
});
</script>
