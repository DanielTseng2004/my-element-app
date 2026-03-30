<template>
  <div class="page-wrapper">
    <el-page-header
      @back="$router.push('/')"
      content="系統表單頁面"
      style="margin-bottom: 20px"
    />

    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>系統表單填寫</span>
        </div>
      </template>

      <el-form
        :model="formData"
        label-position="top"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item
          label="系統名稱: "
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="System Name"
          />
        </el-form-item>

        <el-form-item
          label="發生時間: "
          prop="time"
        >
          <el-date-picker
            v-model="formData.time"
            type="datetime"
            placeholder="選擇日期與時間"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          />
        </el-form-item>

        <el-form-item
          label="異常問題: "
          prop="problem"
        >
          <el-input
            v-model="formData.problem"
            placeholder="請輸入問題"
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
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useHistoryStore } from "../stores/history";
const historyStore = useHistoryStore();
const router = useRouter();
const formRef = ref(null);
const formData = reactive({
  name: "",
  time: "",
  problem: "",
});

const rules = {
  name: [{ required: true, message: "系統名稱必填", trigger: "blur" }],
  time: [{ required: true, message: "時間必填", trigger: "blur" }],
  problem: [{ required: true, message: "問題必填", trigger: "blur" }],
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const newSys = {
        id: Date.now(),
        type: "system",
        sysName: formData.name,
        sysProblem: formData.problem,
        sysTime: formData.time,
        createTime: new Date().toISOString(),
      };

      // ✅ 統一呼叫 Action
      historyStore.addRecord(newSys);

      ElMessage.success("送出成功");
      router.push("/about");
    }
  });
};

const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
</script>

<style scoped>
:deep(.el-form-item__content > .el-input),
:deep(.el-form-item__content > .el-textarea),
:deep(.el-form-item__content > .el-radio-group) {
  width: 100%;
  /* 強制所有表單元件寬度一致 */
}

.form-buttons-item :deep(.el-form-item__content) {
  justify-content: center;
  /* 讓按鈕在剩餘空間置中 */
}

.page-wrapper {
  padding: 40px;
  min-height: 100vh;
  max-width: 1000px;
  width: 95%;
  margin: 0 auto;
  background-color: #f5f7fa;
}

/* FormView.vue 與 SysFormView.vue 修正 */
.form-card {
  width: 95%;
  /* 手機時佔 95% 寬度 */
  max-width: 800px;
  /* 電腦時最大 800px */
  margin: 0 auto;
}

.form-buttons {
  display: flex;
  justify-content: center;
  /* 讓按鈕整體居中 */
  gap: 15px;
  /* 按鈕之間的間距 */
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 15px;
    /* 手機版減少外層間距 */
  }

  .form-buttons {
    flex-direction: column;
    /* 按鈕變成上下堆疊 */
    width: 100%;
  }

  .el-button {
    width: 100%;
    /* 讓每個按鈕都佔滿寬度 */
    margin-left: 0 !important;
    /* 移除 Element 內建的左間距 */
  }
}
</style>
