<template>
  <div class="form-view">
    <div class="page-wrapper">
      <el-page-header
        @back="$router.push('/')"
        content="用戶註冊"
        style="margin-bottom: 20px"
      />
      <el-card class="form-card">
        <template #header>
          <div class="card-header">
            <span>用戶註冊資訊</span>
          </div>
        </template>
        <el-form
          :model="form"
          label-position="top"
          :rules="rules"
          ref="formRef"
        >
          <el-form-item
            label="使用者姓名"
            prop="name"
          >
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="聯絡信箱"
            prop="email"
          >
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item
            label="性別"
            prop="gender"
          >
            <el-radio-group v-model="form.gender">
              <el-radio value="male">男</el-radio>
              <el-radio value="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="備註內容">
            <el-input
              v-model="form.desc"
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
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useHistoryStore } from "../../stores/history";
const historyStore = useHistoryStore();
const router = useRouter();
const formRef = ref(null);
const form = reactive({
  name: "",
  email: "",
  gender: "male",
  desc: "",
});
const rules = {
  name: [{ required: true, message: "請輸入姓名", trigger: "blur" }],
  email: [
    { required: true, message: "請輸入信箱", trigger: "blur" },
    { type: "email", message: "信箱格式不正確", trigger: "blur" },
  ],
  gender: [{ required: true, message: "請選擇性別", trigger: "change" }],
  desc: [{ required: false, message: "請填寫備註內容", trigger: "blur" }],
};
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const newUser = {
        id: Date.now(),
        type: "user",
        userName: form.name,
        userEmail: form.email,
        userGender: form.gender,
        userDesc: form.desc,
        createTime: new Date().toISOString(),
      };
      historyStore.addRecord(newUser);
      ElMessage.success("註冊成功");
      router.push("/about");
    }
  });
};
const resetForm = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
};
</script>
