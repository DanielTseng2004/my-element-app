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
import { useHistoryStore } from "../../stores/history";
const router = useRouter();
const formRef = ref(null);
const historyStore = useHistoryStore();
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
  formRef.value.validate((valid) => {
    if (valid) {
      const newSurvey = {
        id: Date.now(),
        type: "survey",
        // ... 其他欄位
        createTime: new Date().toISOString(),
      };
      // 直接呼叫 store 的 action
      historyStore.addRecord(newSurvey);
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
