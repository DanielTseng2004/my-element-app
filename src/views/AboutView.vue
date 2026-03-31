<template>
  <div class="page-wrapper">
    <div class="about-page">
      <el-page-header
        @back="$router.push('/')"
        content="系統管理中心"
        style="margin-bottom: 20px"
      />

      <el-card
        shadow="never"
        style="margin-bottom: 20px"
      >
        <template #header>
          <div class="card-header">
            <span>歷史提交紀錄 (LocalStorage)</span>
            <el-button
              type="danger"
              link
              @click="clearAllHistory"
              :disabled="historyList.length === 0"
            >
              清空所有紀錄
            </el-button>
          </div>
        </template>

        <div class="filter-toolbar">
          <el-input
            v-model="searchQuery"
            placeholder="搜尋姓名、設備、系統名稱或 ID..."
            prefix-icon="Search"
            clearable
            style="width: 300px"
          />
          <div class="right-tools">
            <span class="label">排序：</span>
            <el-select
              v-model="sortOrder"
              style="width: 150px"
            >
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>

        <el-segmented
          v-model="filterType"
          :options="[
            { label: '全部', value: 'all' },
            { label: '用戶', value: 'user' },
            { label: '系統', value: 'system' },
            { label: '設備', value: 'device' },
            { label: '問卷', value: 'survey' },
          ]"
          style="margin-bottom: 20px"
        />

        <el-table
          :data="paginatedData"
          style="width: 100%"
          stripe
          border
        >
          <el-table-column type="expand">
            <template #default="scope">
              <div
                class="expand-wrapper"
                style="padding: 20px; background: #f9f9f9"
              >
                <p v-if="scope.row.type === 'user'">
                  <strong>備註詳情：</strong> {{ scope.row.userDesc || "無" }}
                </p>
                <p v-else-if="scope.row.type === 'system'">
                  <strong>異常詳情：</strong> {{ scope.row.sysProblem || "無" }}
                </p>
                <p v-else-if="scope.row.type === 'device'">
                  <strong>異常詳情：</strong> {{ scope.row.deviceDesc || "無" }}
                </p>
                <p v-else-if="scope.row.type === 'survey'">
                  <strong>問卷回饋：</strong> {{ scope.row.feedback || "無" }}
                </p>
                <p><strong>紀錄 ID：</strong> {{ scope.row.id }}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="紀錄時間"
            width="200"
          >
            <template #default="scope">
              {{
                scope.row.createTime
                  ? scope.row.createTime.replace("T", " ").substring(0, 19)
                  : "N/A"
              }}
            </template>
          </el-table-column>

          <el-table-column
            label="類型"
            width="100"
          >
            <template #default="scope">
              <el-tag :type="typeConfig[scope.row.type]?.tagType">
                {{ typeConfig[scope.row.type]?.label || "未知" }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column label="內容摘要">
            <template #default="scope">
              <span v-if="scope.row.type === 'user'">{{
                scope.row.userName
              }}</span>
              <span v-else-if="scope.row.type === 'system'">{{
                scope.row.sysName
              }}</span>
              <span v-else-if="scope.row.type === 'device'">
                {{ scope.row.deviceName }} ({{ scope.row.deviceType }})
              </span>
              <span v-else-if="scope.row.type === 'survey'">{{
                scope.row.surveyTitle
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="狀態"
            width="120"
          >
            <template #default="scope">
              <el-tag :type="getStatusType(scope.row.status)">
                {{ getStatusLabel(scope.row.status) }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="150"
          >
            <template #default="scope">
              <el-button
                size="small"
                type="primary"
                @click="openAuditDialog(scope.row)"
              >
                處理
              </el-button>
              <el-button
                size="small"
                type="danger"
                @click="handleDeleteHistory(scope.row.id)"
              >
                刪除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div style="margin-top: 20px; display: flex; justify-content: center">
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :total="filteredHistory.length"
            layout="total, prev, pager, next, jumper"
            background
          />
        </div>
      </el-card>

      <el-dialog
        v-model="auditVisible"
        title="表單審核處理"
        width="400px"
      >
        <el-form
          :model="auditForm"
          label-position="top"
        >
          <el-form-item label="變更狀態">
            <el-select
              v-model="auditForm.status"
              style="width: 100%"
            >
              <el-option
                label="待處理"
                value="pending"
              />
              <el-option
                label="已完成"
                value="success"
              />
              <el-option
                label="已拒絕"
                value="danger"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="管理員備註">
            <el-input
              v-model="auditForm.msg"
              type="textarea"
              :rows="3"
              placeholder="請輸入處理說明..."
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="auditVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="submitAudit"
            >提交更新</el-button
          >
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useHistoryStore } from "../stores/history";
import { storeToRefs } from "pinia";

// 1. 初始化 Store 並提取響應式屬性
const historyStore = useHistoryStore();
const { historyList } = storeToRefs(historyStore); // 關鍵：保持數據聯動

// 2. 基礎 UI 狀態
const filterType = ref("all");
const currentPage = ref(1);
const pageSize = ref(10);
const searchQuery = ref("");
const sortOrder = ref("newest");

const sortOptions = [
  { label: "從新到舊", value: "newest" },
  { label: "從舊到新", value: "oldest" },
];

const typeConfig = {
  user: { label: "用戶", tagType: "success" },
  system: { label: "系統", tagType: "warning" },
  device: { label: "設備", tagType: "danger" },
  survey: { label: "問卷", tagType: "primary" },
};

// 3. 審核邏輯
const auditVisible = ref(false);
const currentId = ref(null);
const auditForm = reactive({
  status: "",
  msg: "",
});

const getStatusType = (status) => {
  const map = { pending: "warning", success: "success", danger: "danger" };
  return map[status] || "info";
};

const getStatusLabel = (status) => {
  const map = { pending: "待處理", success: "已完成", danger: "已拒絕" };
  return map[status] || "未知";
};

const openAuditDialog = (row) => {
  currentId.value = row.id;
  auditForm.status = row.status;
  auditForm.msg = row.adminMsg || "";
  auditVisible.value = true;
};

const submitAudit = () => {
  historyStore.updateStatus(currentId.value, auditForm.status, auditForm.msg);
  ElMessage.success("狀態更新完成");
  auditVisible.value = false;
};

// 4. 過濾與搜尋邏輯 (核心計算屬性)
const filteredHistory = computed(() => {
  // 直接調用 store 的 getter
  let result = [...historyStore.getAllHistory];

  if (filterType.value !== "all") {
    result = result.filter((item) => item.type === filterType.value);
  }

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase();
    result = result.filter((item) => {
      return (
        item.userName?.toLowerCase().includes(q) ||
        item.sysName?.toLowerCase().includes(q) ||
        item.deviceName?.toLowerCase().includes(q) ||
        item.surveyTitle?.toLowerCase().includes(q) ||
        item.id?.toString().includes(q)
      );
    });
  }

  // 排序邏輯
  result.sort((a, b) => {
    const dateA = new Date(a.createTime);
    const dateB = new Date(b.createTime);
    return sortOrder.value === "newest" ? dateB - dateA : dateA - dateB;
  });

  return result;
});

// 5. 分頁邏輯
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredHistory.value.slice(start, start + pageSize.value);
});

// 6. 生命週期與事件處理
const handleDeleteHistory = (id) => {
  historyStore.deleteRecord(id);
  ElMessage.success("刪除成功");
};

const clearAllHistory = () => {
  ElMessageBox.confirm("將清空所有紀錄，此操作不可逆！", "危險操作", {
    confirmButtonText: "全部清空",
    type: "error",
  }).then(() => {
    historyStore.clearHistory();
    ElMessage.success("已清空所有數據");
  });
};

watch(filterType, () => {
  currentPage.value = 1;
});

onMounted(() => {
  historyStore.initHistory();
});
</script>
