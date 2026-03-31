<template>
  <div class="summary-page">
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
                >
                  <component :is="card.icon" />
                </el-icon>
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
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card header="最近提交趨勢">
              <div
                ref="lineChartRef"
                style="width: 100%; height: 350px"
              ></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useHistoryStore } from "../../stores/history";
import * as echarts from "echarts";
import { User, Setting, Monitor, ChatLineRound } from "@element-plus/icons-vue";

const historyStore = useHistoryStore();
const route = useRoute();
const router = useRouter();

const pieChartRef = ref(null);
const lineChartRef = ref(null);
let pieChart = null;
let lineChart = null;

const stats = computed(() => ({
  user: historyStore.historyList.filter((i) => i.type === "user").length,
  system: historyStore.historyList.filter((i) => i.type === "system").length,
  device: historyStore.historyList.filter((i) => i.type === "device").length,
  survey: historyStore.historyList.filter((i) => i.type === "survey").length,
}));

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

const resizeCharts = () => {
  pieChart?.resize();
  lineChart?.resize();
};

onMounted(async () => {
  await nextTick();

  if (pieChartRef.value && lineChartRef.value) {
    pieChart = echarts.init(pieChartRef.value);
    lineChart = echarts.init(lineChartRef.value);
    setTimeout(() => {
      resizeCharts();
    }, 400);
    pieChart.setOption({
      tooltip: { trigger: "item" },
      legend: { bottom: "5%", left: "center" },
      series: [
        {
          name: "表單類型",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
          label: { show: false, position: "center" },
          emphasis: {
            label: { show: true, fontSize: "20", fontWeight: "bold" },
          },
          data: [
            { value: stats.value.user, name: "用戶註冊" },
            { value: stats.value.system, name: "系統異常" },
            { value: stats.value.device, name: "設備報修" },
            { value: stats.value.survey, name: "問卷回饋" },
          ],
        },
      ],
    });

    lineChart.setOption({
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        boundaryGap: false,
      },
      yAxis: { type: "value" },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
          smooth: true,
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(64, 158, 255, 0.5)" },
              { offset: 1, color: "rgba(64, 158, 255, 0)" },
            ]),
          },
          lineStyle: { width: 3, color: "#409EFF" },
        },
      ],
    });

    resizeCharts();
  }

  window.addEventListener("resize", resizeCharts);

  setTimeout(resizeCharts, 300);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeCharts);
  pieChart?.dispose();
  lineChart?.dispose();
});
</script>

<style scoped>
.card-content {
  display: flex;
  align-items: center;
  gap: 15px;
}
.stat-info .title {
  font-size: 14px;
  color: #909399;
}
.stat-info .count {
  font-size: 20px;
  font-weight: bold;
}
</style>
