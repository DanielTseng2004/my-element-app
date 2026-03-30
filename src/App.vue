<template>
  <div class="common-layout">
    <header class="nav-header">
      <div class="nav-container">
        <div class="brand">
          <span class="brand-name">VUE ADMIN</span>
        </div>

        <el-menu
          :default-active="$route.path"
          class="custom-menu"
          mode="horizontal"
          router
          background-color="transparent"
          text-color="rgba(255,255,255,0.85)"
          active-text-color="#ffffff"
        >
          <el-menu-item index="/"
            ><el-icon color="light"><HomeFilled /></el-icon
            ><span>首頁</span></el-menu-item
          >
          <el-menu-item index="/form">
            <el-icon color="light"><User /></el-icon
            ><span>資料填寫</span></el-menu-item
          >
          <el-menu-item index="/sysform">
            <el-icon color="light"><Setting /></el-icon
            ><span>系統表單</span></el-menu-item
          >
          <el-menu-item index="/device">
            <el-icon color="light"><Monitor /></el-icon
            ><span>報修表單</span></el-menu-item
          >
          <el-menu-item index="/survey">
            <el-icon color="light"><Document /></el-icon
            ><span>問卷調查</span></el-menu-item
          >
          <el-menu-item index="/about">
            <el-icon color="light"><Memo /></el-icon
            ><span>系統管理</span></el-menu-item
          >
        </el-menu>
      </div>
    </header>

    <el-main class="main-content">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <footer class="footer">
      <p>© 2026 Vue Element Plus 練習專案</p>
    </footer>
  </div>
</template>

<style>
/* --- 導覽列美化 --- */
.nav-header {
  /* 使用漸層藍色，視覺更現代 */
  background: linear-gradient(90deg, #409eff 0%, #3a8ee6 100%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.brand {
  margin-right: 40px;
}

.brand-name {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

.custom-menu {
  border-bottom: none !important; /* 移除 Element 預設底線 */
  flex-grow: 1;
}

/* 調整選單項目樣式 */
.custom-menu .el-menu-item {
  font-size: 15px;
  height: 60px;
  line-height: 60px;
  transition: all 0.3s ease !important;
}

/* 滑鼠懸停時微幅變亮 */
.custom-menu .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: #fff !important;
}

/* 啟動狀態的下底線優化 */
.custom-menu .el-menu-item.is-active {
  border-bottom: 3px solid #ffd04b !important;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/* --- 原有樣式保持並微調 --- */
body {
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}

.main-content {
  padding: 24px;
  min-height: calc(100vh - 60px - 60px);
}

.footer {
  text-align: center;
  padding: 30px;
  color: #909399;
  background: #fff; /* 讓 Footer 也有個背景色區隔 */
  border-top: 1px solid #e4e7ed;
}

/* 換頁動畫保持 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
