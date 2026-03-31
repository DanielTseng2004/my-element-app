<template>
  <div class="page-wrapper">
    <el-page-header
      @back="$router.push('/')"
      content="數據導出中心"
      style="margin-bottom: 20px"
    />
    <div class="export-container">
      <el-card>
        <template #header>
          <div class="header">
            <span>數據導出中心</span>
            <el-button
              type="success"
              @click="downloadExcel"
            >
              <el-icon style="margin-right: 5px"><Download /></el-icon> 導出
              Excel
            </el-button>
          </div>
        </template>

        <el-table
          :data="historyStore.historyList"
          border
          stripe
        >
          <el-table-column
            prop="createTime"
            label="時間"
            width="180"
          />
          <el-table-column
            prop="type"
            label="類型"
            width="100"
          />
          <el-table-column label="內容摘要">
            <template #default="scope">
              {{
                scope.row.userName ||
                scope.row.sysName ||
                scope.row.deviceName ||
                "問卷提交"
              }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from "../../stores/history";
import * as XLSX from "xlsx";
import { Download } from "@element-plus/icons-vue";

const historyStore = useHistoryStore();

const downloadExcel = () => {
  // 1. 準備數據
  const data = historyStore.historyList.map((item) => ({
    提交時間: item.createTime,
    表單類型: item.type,
    主體名稱: item.userName || item.sysName || item.deviceName || "N/A",
    詳情描述:
      item.userDesc ||
      item.sysProblem ||
      item.deviceDesc ||
      item.feedback ||
      "",
  }));

  // 2. 建立工作表
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "HistoryReport");

  // 3. 下載檔案
  XLSX.writeFile(workbook, `Report_${new Date().getTime()}.xlsx`);
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-wrapper {
  padding: 40px;
  min-height: 100vh;
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  background-color: #f5f7fa;
}
</style>
