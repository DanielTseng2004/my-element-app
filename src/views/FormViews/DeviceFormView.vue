<template>
  <div class="page-wrapper">
    <el-page-header
      @back="$router.push('/')"
      content="設備報修申請"
      style="margin-bottom: 20px"
    />

    <el-card class="form-card">
      <template #header>
        <div class="card-header"><span>報修資料填寫</span></div>
      </template>

      <el-form
        :model="deviceForm"
        :rules="rules"
        ref="deviceFormRef"
        label-position="top"
      >
        <el-form-item
          label="設備資產編號"
          prop="id"
        >
          <el-input
            v-model="deviceForm.id"
            placeholder="例如：PC-2024-001"
          />
        </el-form-item>

        <el-form-item
          label="設備類型"
          prop="type"
        >
          <el-select
            v-model="deviceForm.type"
            placeholder="請選擇設備種類"
            style="width: 100%"
          >
            <el-option
              label="桌上型電腦"
              value="Desktop"
            />
            <el-option
              label="筆記型電腦"
              value="Laptop"
            />
            <el-option
              label="列印/掃描設備"
              value="Printer"
            />
            <el-option
              label="網路設備"
              value="Network"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          label="緊急程度"
          prop="urgency"
        >
          <el-radio-group v-model="deviceForm.urgency">
            <el-radio
              value="low"
              border
              >一般</el-radio
            >
            <el-radio
              value="high"
              border
              >緊急</el-radio
            >
            <el-radio
              value="critical"
              border
              >立刻處理</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="故障詳細描述"
          prop="desc"
        >
          <el-input
            v-model="deviceForm.desc"
            type="textarea"
            :rows="4"
            placeholder="請詳細說明故障現象（例如：藍屏、無法通電、缺墨水...）"
          />
        </el-form-item>

        <div
          style="
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
          "
        >
          <el-button
            type="primary"
            @click="submitForm"
            ><el-icon><DocumentChecked /></el-icon><span>提交</span></el-button
          >
          <el-button
            type="danger"
            @click="resetForm"
            ><el-icon><Refresh /></el-icon><span>重置</span></el-button
          >
          <el-button @click="$router.push('/')"
            ><el-icon><DArrowLeft /></el-icon><span>返回</span></el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useHistoryStore } from "../../stores/history";
const historyStore = useHistoryStore();
const router = useRouter();
const deviceFormRef = ref(null);

const deviceForm = reactive({
  id: "",
  type: "",
  urgency: "low",
  desc: "",
});

const rules = {
  id: [{ required: true, message: "請輸入設備編號", trigger: "blur" }],
  type: [{ required: true, message: "請選擇設備類型", trigger: "change" }],
  desc: [{ required: true, message: "請描述故障問題", trigger: "blur" }],
};

const submitForm = () => {
  deviceFormRef.value.validate((valid) => {
    if (valid) {
      const newRecord = {
        id: Date.now(),
        type: "device",
        deviceName: deviceForm.id,
        deviceType: deviceForm.type,
        urgency: deviceForm.urgency,
        deviceDesc: deviceForm.desc,
        // 建議統一使用 ISO 格式方便排序
        createTime: new Date().toISOString(),
      };

      // ✅ 替換掉原本的 localStorage.setItem 邏輯
      historyStore.addRecord(newRecord);

      ElMessage.success("報修申請已送出");
      router.push("/about");
    }
  });
};

const resetForm = () => {
  deviceFormRef.value.resetFields();
};
</script>

<style scoped>
.page-wrapper {
  padding: 40px;
  min-height: 100vh;
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  background-color: #f5f7fa;
}

.form-card {
  width: 95%;
  /* 手機時佔 95% 寬度 */
  max-width: 800px;
  /* 電腦時最大 800px */
  margin: 0 auto;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
}
/* 讓單選框在手機版也能整齊排列 */
:deep(.el-radio-group) {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
