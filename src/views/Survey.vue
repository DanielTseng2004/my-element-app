<template>
  <div class="page-wrapper">
    <el-page-header
      @back="$router.push('/')"
      content="問卷調查頁面"
      style="margin-bottom: 20px"
    />

    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>回饋表單資訊</span>
        </div>
      </template>

      <el-form
        :model="form"
        label-position="top"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item
          label="表單標題"
          prop="surveyTitle"
        >
          <el-input v-model="form.surveyTitle" />
        </el-form-item>

        <el-form-item
          label="評分"
          prop="rating"
        >
          <el-input v-model="form.rating" />
        </el-form-item>

        <el-form-item label="回饋內容">
          <el-input
            v-model="form.feedback"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>

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
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const formRef = ref(null);

const form = reactive({
  surveyTitle: "",
  rating: "",
  feedback: "",
});

const rules = {
  surveyTitle: [{ required: true, message: "請輸入表單標題", trigger: "blur" }],
  rating: [{ required: true, message: "請輸入評分", trigger: "blur" }],
  feedback: [{ required: true, message: "請填寫回饋內容", trigger: "blur" }],
};

const submitForm = () => {
  if (!formRef.value) return;
  formRef.value.validate((valid) => {
    if (valid) {
      const newSurvey = {
        id: Date.now(),
        type: "survey",
        surveyTitle: form.surveyTitle,
        rating: form.rating,
        feedback: form.feedback,
        createTime: new Date().toISOString(),
      };

      const history = JSON.parse(localStorage.getItem("sys_history") || "[]");
      history.push(newSurvey);
      localStorage.setItem("sys_history", JSON.stringify(history));
      ElMessage.success("送出成功，正在跳轉...");
      router.push({ path: "/about", query: newSurvey });
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
}

.form-buttons-item :deep(.el-form-item__content) {
  justify-content: center;
}

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
  max-width: 800px;
  margin: 0 auto;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

@media (max-width: 768px) {
  .page-wrapper {
    padding: 15px;
  }

  .form-buttons {
    flex-direction: column;
    width: 100%;
  }

  .el-button {
    width: 100%;
    margin-left: 0 !important;
  }
}
</style>
