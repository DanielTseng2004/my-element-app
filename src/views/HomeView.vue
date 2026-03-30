<template>
  <div class="home-container">
    <el-row
      justify="center"
      :align="'middle'"
      style="min-height: 80vh"
    >
      <el-col
        :xs="22"
        :sm="12"
      >
        <el-card shadow="hover">
          <el-result
            icon="success"
            title="歡迎進入系統"
            sub-title="點擊下方按鈕開始填寫資料"
          >
            <template #extra>
              <el-form label-width="auto">
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    @click="$router.push('/form')"
                    ><el-icon color="light"><User /></el-icon>
                    <span>立即前往用戶註冊</span>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    @click="$router.push('/sysform')"
                    ><el-icon color="light"><Setting /></el-icon
                    ><span> 立即前往系統表單</span>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    @click="$router.push('/device')"
                    ><el-icon color="light"><Monitor /></el-icon
                    ><span> 立即前往報修表單</span>
                  </el-button>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    size="large"
                    @click="$router.push('/survey')"
                    ><el-icon color="light"><Document /></el-icon
                    ><span>立即前往問卷調查</span>
                  </el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-result>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home-container {
  background-color: #f5f7fa;
  min-height: 100vh;
  padding: 20px;
}

/* 確保 el-row 能夠撐滿高度以達成垂直置中 */
.el-row {
  width: 100%;
}
</style>
